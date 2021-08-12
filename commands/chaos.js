const Util = require('../utility')

module.exports = {
    name: 'chaos',
    description: 'You will be scattered all over the server! AH AH AH AH',
    async execute(msg, args, discord) {

        if (!(msg.member.hasPermission('ADMINISTRATOR')))
            return msg.channel.send(Util.Reply.errorEmbed("I think you can't...", "You don't have the right permissions to use this command."))

        const chatToAbuse = msg.member.voice.channel
        if (!chatToAbuse) return msg.channel.send(Util.Reply.sendBaseEmbed('Mmm...', "I can't find you..."))

        let allChannels = Util.Utility.getChannelIDs(msg)

        msg.channel.send(Util.Reply.sendBaseEmbed('Beh', "Si Spera"))

        moveMembers(msg, chatToAbuse, allChannels)

        //! AUDIO NON RIPRODUCIBILE
        // await makeChaos(msg, './files/scare/chaos.mp3', chatToAbuse, allChannels)
    }
}

/**
 * Moves members around
 * @param {*} msg command msg
 * @param {*} chatToAbuse channel to target
 * @param {*} allChannels list of all channel
 */
function moveMembers(msg, chatToAbuse, allChannels) {
    chatToAbuse.members.forEach(mem => {
        if (mem != msg.guild.me)
            mem.voice.setChannel(allChannels[Math.floor(Math.random() * allChannels.length)].ID)
    });
}

/**
 * Reproduce audio and call moveMembers
 * @param {*} msg command msg
 * @param {*} path Audio to play
 * @param {*} channel channel to target
 * @param {*} allChannels list of all channel
 */
async function makeChaos(msg, path, channel, allChannels) {
    channel.join().then(connection => {
        const dispatcher = connection.play(path)
        dispatcher.on("finish", finish => {
            msg.guild.me.voice.channel.leave()
            moveMembers(msg, channel, allChannels)
        });
    }).catch(e => {
        console.error(e);
    });
}