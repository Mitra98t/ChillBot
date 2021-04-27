const Util = require('../utility')

module.exports = {
    name: "scareme",
    description: "Tu non mi fai paura",
    execute(msg, args, discord){
        if(Util.Check.isInVoiceChannel(msg.guild.me)){
            msg.channel.send(Util.Reply.errorEmbed('Sono già in uso!', 'Sto già riproducendo qualcosa!\nMi servono i miei spazi...'));
            return null
        }
        
        msg.channel.send(Util.Reply.sendBaseEmbed('Arrivo...', 'Devi solo stare tranquillo.'));
        
        let chanToJoin;
        if(msg.mentions.users.first()){
            // console.log(msg.guild.members.cache.get(msg.mentions.users[0].id))
            let target = msg.guild.members.cache.get(msg.mentions.users.first().id)
            chanToJoin = target.voice.channel
        }
        else{
            chanToJoin = msg.member.voice.channel
        }

        if (!chanToJoin) return msg.channel.send(Util.Reply.errorEmbed('Non sei in un canale', 'Non te pozz parlà mo no'))
        chanToJoin.join().then(connection => {
            //Math.floor(Math.random() * (max - min)) + min;
            let usableFiles = Util.Utility.getCurrentFilenames('./files/scare')
            const dispatcher = connection.play(`./files/scare/${usableFiles[Math.floor(Math.random() * usableFiles.length)]}`);
            dispatcher.on("finish", finish => msg.guild.me.voice.channel.leave());
            //console.log("Successfully connected.");
        }).catch(e => {
            console.error(e);
        });
    }
}