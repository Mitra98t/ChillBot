const ytdl = require('ytdl-core')
const Util = require('../utility')

//TODO: queue system
module.exports = {
    name: 'play',
    description: 'Youtube music',
    async execute(msg, args, discord){
        if(Util.Check.isInVoiceChannel(msg.guild.me)){
            msg.channel.send(Util.Reply.errorEmbed('Sono già in uso!', 'Sto già riproducendo qualcosa!\nMi servono i miei spazi...'));
            return null
        }

        const voiceChannel = msg.member.voice.channel
        if (!voiceChannel) return msg.channel.send(Util.Reply.errorEmbed('Non sei in un canale', 'Non te pozz parlà mo no'))

        if(args.length <= 0){
            msg.channel.send(Util.Reply.errorEmbed('Qualcosa non va!', 'Devi includere il link del brano da riprodurre'));
            return null;
        }
        
        if(ytdl.validateURL(args[0])){
            const songInfo = await ytdl.getInfo(args[0])
            song = { title: songInfo.videoDetails.title, url: songInfo.videoDetails.video_url }

            try{
                await videoPlayer(msg, song, voiceChannel, embed)
            } catch(e){
                msg.channel.send(Util.Reply.errorEmbed('Qualcosa è andato storto!', 'Link incluso non valido'));
                console.log(e)
            }

        }
        else{
            msg.channel.send(Util.Reply.errorEmbed('Qualcosa è andato storto!', 'Link incluso non valido'));
            return null;
        }
    }
}


async function videoPlayer(msg, song, channel, embed){
    const stream = ytdl(song.url, { filter: 'audioonly' })
    msg.channel.send(Util.Reply.sendBaseEmbed('Music', 'Balliamo!', Util.Colors.green).addField('Riproducendo', song.title));

    channel.join().then(connection => {
        const dispatcher = connection.play(stream);
        dispatcher.on("finish", finish => msg.guild.me.voice.channel.leave());
    }).catch(e => {
        console.error(e);
    });
}