const { normalize } = require('ffmpeg-static')
const Util = require('../utility')

module.exports = {
    name: 'chaos',
    description: 'You will be scattered all over the server! AH AH AH AH',
    execute(msg, args, discord){
        if(!(msg.member.roles.cache.some(r => r.name === "Capo Crew") || msg.member.roles.cache.some(r => r.name === "Admin") || msg.member.roles.cache.some(r => r.name === "Padrino"))){
            return msg.channel.send(Util.Reply.errorEmbed("I think you can't...", "You don't have the right permissions to use this command."))
        }

        const chatToAbuse = msg.member.voice.channel
        if (!chatToAbuse) return msg.channel.send(Util.Reply.sendBaseEmbed('Mmm...', "I can't find you..."))

        let allChannels = Util.Utility.getChannelIDs(msg)

        chatToAbuse.members.forEach(mem => { 
            mem.voice.setChannel(allChannels[Math.floor(Math.random()*allChannels.length)].ID)
        });
    }
}
