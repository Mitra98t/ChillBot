const ytdl = require('ytdl-core')
const Util = require('../utility')

//TODO: queue system
module.exports = {
    name: 'play',
    description: 'Youtube music',
    async execute(msg, args, discord){
        if(Util.Check.isInVoiceChannel(msg.guild.me)){
            return msg.channel.send(Util.Reply.errorEmbed("I'm already in use", "I'm playing something elsewhere!\nI need my own spaces...")); 
        }

        const voiceChannel = msg.member.voice.channel
        if (!voiceChannel) return msg.channel.send(Util.Reply.errorEmbed('Mmm...', "I can't find you..."))

        if(args.length <= 0){
            msg.channel.send(Util.Reply.errorEmbed("This doesen't seem right!", 'You have to include the link of the song you want to listen to.'));
            return null;
        }
        
        if(ytdl.validateURL(args[0])){
            const songInfo = await ytdl.getInfo(args[0])
            song = { title: songInfo.videoDetails.title, url: songInfo.videoDetails.video_url }

            try{
                await videoPlayer(msg, song, voiceChannel, embed)
            } catch(e){
                msg.channel.send(Util.Reply.errorEmbed('Something went wrong!', "The included link isn't valid"));
                console.log(e)
            }

        }
        else{
            msg.channel.send(Util.Reply.errorEmbed('Something went wrong!', "The included link isn't valid"));
            return null;
        }
    }
}


async function videoPlayer(msg, song, channel, embed){
    const stream = ytdl(song.url, { filter: 'audioonly' })
    msg.channel.send(Util.Reply.sendBaseEmbed('Music', "Let's dance!", Util.Colors.green).addField('Playing', song.title));

    channel.join().then(connection => {
        const dispatcher = connection.play(stream);
        dispatcher.on("finish", finish => msg.guild.me.voice.channel.leave());
    }).catch(e => {
        console.error(e);
    });
}