const { normalize } = require('ffmpeg-static')
const Util = require('../utility')

module.exports = {
    name: 'solitudine',
    description: 'Ora siete da soli',
    execute(msg, args, discord){
        if(!(msg.member.roles.cache.some(r => r.name === "Capo Crew") || msg.member.roles.cache.some(r => r.name === "Admin"))){
            return msg.channel.send(Util.Reply.errorEmbed('Mi sa di no...', 'Non hai permessi sufficienti per usare questo comando'))
        }

        const chatToAbuse = msg.member.voice.channel
        if (!chatToAbuse) return msg.channel.send(Util.Reply.sendBaseEmbed('Mmm...', 'Ti è andata bene...'))

        let allChannels = Util.Utility.getChannelIDs(msg)

        chatToAbuse.members.forEach(mem => { 
            mem.voice.setChannel(allChannels[Math.floor(Math.random()*allChannels.length)].ID)
        });
    }
}
