const fs = require('fs');
const discord = require('discord.js');


const red = '#FA1444'
const defColor = '#FA8F40'
const green = '#6DFA46'
exports.Colors = {
    red,
    defColor,
    green,
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
            if(chan.type == 'voice')
                array.push({ID: id, name:chan.name})
        })

        return array;
    }
}

exports.Check = {
    isInVoiceChannel(me) { return me.voice.channel ? true : false }
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