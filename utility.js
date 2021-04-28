const fs = require('fs');
const discord = require('discord.js');
const { send } = require('process');

/* PERMISSIONS */
const muteMembers = "MUTE_MEMBERS"
const moveMembers = "MOVE_MEMBERS"
const viewChannel = "VIEW_CHANNEL"
const sendMsg = "SEND_MESSAGES"
const sendTTSMsg = "SEND_TTS_MESSAGES"
const connectChannel = "CONNECT"
const speak = "SPEAK"


/* COLORS */
const defColor = '#FA8F40'
const red = '#FA1444'
const green = '#6DFA46'

exports.Colors = {
    defColor,
    red,
    green,
}

exports.Pex = {
    muteMembers,
    moveMembers,
    viewChannel,
    sendMsg,
    sendTTSMsg,
    connectChannel,
    speak,
}

exports.Utility = {
    getCurrentFilenames(path) {
        let res = []
        fs.readdirSync(path).forEach(file => {
            res.push(file);
        });
        return res
    },
    getChannelIDs(msg) {
        let array = [];
        let channels = msg.guild.channels.cache;
        channels.forEach((chan, id) => {
            if (chan.type == 'voice')
                array.push({ ID: id, name: chan.name })
        })

        return array;
    }
}

exports.Check = {
    isInVoiceChannel(me) { return me.voice.channel ? true : false },
    canConnect(me) { return me.hasPermission(connectChannel) ? true : false },
    canSpeak(me) { return me.hasPermission(speak) ? true : false },
    canViewChannel(me) { return me.hasPermission(viewChannel) ? true : false },
    canSendMsg(me) { return me.hasPermission(sendMsg) ? true : false },
    canMoveMembers(me) { return me.hasPermission(moveMembers) ? true : false },
}

exports.Reply = {
    errorEmbed(title, description) {
        let embed = new discord.MessageEmbed()
            .setColor(red)
            .setTitle(title)
            .setDescription(description)
        return embed
    },
    sendBaseEmbed(title, description, color) {
        let hexColorReg = /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/gm
        let col = hexColorReg.test(color) ? color : defColor

        let embed = new discord.MessageEmbed()
            .setColor(col)
            .setTitle(title)
            .setDescription(description)
        return embed
    }
}