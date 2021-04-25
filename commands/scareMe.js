const Utility = require('../utility').Utility

module.exports = {
    name: "scareme",
    description: "Tu non mi fai paura",
    execute(msg, args, discord){
        if(Check.isInVoiceChannel(msg)){
            let embed = new discord.MessageEmbed()
                .setColor('#'+Math.floor(Math.random()*16777215).toString(16))
                .setTitle('Hey!')
                .addField('Gia in uso', 'Sono in uso in un altro canale');
            msg.channel.send(embed);
            return null
        }

        let embed = new discord.MessageEmbed()
            .setColor('#A0124C')
            .setTitle('Arrivo...')
        
        msg.channel.send(embed);
        
        let chanToJoin;
        if(msg.mentions.users.first()){
            // console.log(msg.guild.members.cache.get(msg.mentions.users[0].id))
            let target = msg.guild.members.cache.get(msg.mentions.users.first().id)
            chanToJoin = target.voice.channel
        }
        else{
            chanToJoin = msg.member.voice.channel
        }

        if (!chanToJoin) return msg.reply('Non te pozz parlà mo no')
        chanToJoin.join().then(connection => {
            //Math.floor(Math.random() * (max - min)) + min;
            let usableFiles = Utility.getCurrentFilenames('./files/scare')
            const dispatcher = connection.play(`./files/scare/${usableFiles[Math.floor(Math.random() * usableFiles.length)]}`);
            dispatcher.on("finish", finish => msg.guild.me.voice.channel.leave());
            //console.log("Successfully connected.");
        }).catch(e => {
            console.error(e);
        });
    }
}