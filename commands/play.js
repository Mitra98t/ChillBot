const ytdl = require('ytdl-core')
const Check = require('../utility').Check

//TODO: queue system
module.exports = {
    name: 'play',
    description: 'Youtube music',
    async execute(msg, args, discord){
        if(Check.isInVoiceChannel(msg)){
            let embed = new discord.MessageEmbed()
                .setColor('#'+Math.floor(Math.random()*16777215).toString(16))
                .setTitle('Hey!')
                .addField('Gia in uso', 'Sono in uso in un altro canale');
            msg.channel.send(embed);
            return null
        }

        let embed = new discord.MessageEmbed()
        const voiceChannel = msg.member.voice.channel
        if (!voiceChannel) return msg.reply('Non te pozz parlà mo no')

        if(args.length <= 0){
            embed.setColor('#A0124C')
                .setTitle('Qualcosa non va!')
                .setDescription('Devi includere il link del brano da riprodurre');

            msg.channel.send(embed);
            return null;
        }
        
        if(ytdl.validateURL(args[0])){
            const songInfo = await ytdl.getInfo(args[0])
            song = { title: songInfo.videoDetails.title, url: songInfo.videoDetails.video_url }

            try{
                await videoPlayer(msg, song, voiceChannel, embed)
            } catch(e){
                embed.setColor('#A0124C')
                    .setTitle('Qualcosa è andato storto!')
                    .setDescription('Link incluso non valido');

                msg.channel.send(embed);
                console.log(e)
            }

        }
        else{
            embed.setColor('#A0124C')
                .setTitle('Qualcosa non va!')
                .setDescription('Link incluso non valido');

            msg.channel.send(embed);
            return null;
        }
    }
}


async function videoPlayer(msg, song, channel, embed){
    const stream = ytdl(song.url, { filter: 'audioonly' })

    embed.setColor('#'+Math.floor(Math.random()*16777215).toString(16))
        .setTitle('Music!')
        .addField('Riproducendo', song.title);
    msg.channel.send(embed);

    channel.join().then(connection => {
        const dispatcher = connection.play(stream);
        dispatcher.on("finish", finish => msg.guild.me.voice.channel.leave());
    }).catch(e => {
        console.error(e);
    });
}