const fs = require('fs');
const discord = require('discord.js');

/* PERMISSIONS */
// complete list here https://discord.com/developers/docs/topics/permissions
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

/**
 * Color list 
 */
exports.Colors = {
    defColor,
    red,
    green,
}

/**
 * Pex list
 */
exports.Pex = {
    muteMembers,
    moveMembers,
    viewChannel,
    sendMsg,
    sendTTSMsg,
    connectChannel,
    speak,
}

/**
 * Utility methods
 */
exports.Utility = {
    /**
     * Gives all file names in the given dir
     * @param {*} path path of the folder to get files from
     * @returns array of file names
     */
    getCurrentFilenames(path) {
        let res = []
        fs.readdirSync(path).forEach(file => {
            res.push(file);
        });
        return res
    },
    /**
     * Gives the list of vocal channel's IDs
     * @param {*} msg command message
     * @returns array of channel ID
     */
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

/**
 * Check methods
 */
exports.Check = {
    /**
     * Checks if the bot is in a vocal channel
     * @param {*} me bot member
     * @returns boolean
     */
    isInVoiceChannel(me) { return me.voice.channel ? true : false },
    /**
     * Checks if the bot can connect to channels
     * @param {*} me bot member
     * @returns boolean
     */
    canConnect(me) { return me.hasPermission(connectChannel) ? true : false },
    /**
     * Checks if the bot can speak
     * @param {*} me bot member
     * @returns boolean
     */
    canSpeak(me) { return me.hasPermission(speak) ? true : false },
    /**
     * Checks if the bot can view channel
     * @param {*} me bot member
     * @returns boolean
     */
    canViewChannel(me) { return me.hasPermission(viewChannel) ? true : false },
    /**
     * Checks if the bot can send messages
     * @param {*} me bot member
     * @returns boolean
     */
    canSendMsg(me) { return me.hasPermission(sendMsg) ? true : false },
    /**
     * Checks if the bot can move members
     * @param {*} me bot member
     * @returns boolean
     */
    canMoveMembers(me) { return me.hasPermission(moveMembers) ? true : false },
}

/**
 * Reply presets & Embed presets
 */
exports.Reply = {
    /**
     * Creates a basic embed using red color
     * @param {*} title Error title
     * @param {*} description Error description
     * @returns embed
     */
    errorEmbed(title, description) {
        let embed = new discord.MessageEmbed()
            .setColor(red)
            .setTitle(title)
            .setDescription(description)
        return embed
    },
    /**
     * Creates a basic embed
     * @param {*} title Message Title
     * @param {*} description Message content
     * @param {*} color Message color (hex or using the color list export)
     * @returns embed
     */
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