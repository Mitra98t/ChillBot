const Util = require('../utility')

module.exports = {
    name: "scareme",
    description: "I'm not scared of you",
    execute(msg, args, discord){
        if(Util.Check.isInVoiceChannel(msg.guild.me)){
            return msg.channel.send(Util.Reply.errorEmbed("I'm already in use", "I'm playing something elsewhere!\nI need my own spaces...")); 
        }
        
        msg.channel.send(Util.Reply.sendBaseEmbed("I'm coming...", 'Just wait for me.'));
        
        let chanToJoin;
        if(msg.mentions.users.first()){
            // console.log(msg.guild.members.cache.get(msg.mentions.users[0].id))
            let target = msg.guild.members.cache.get(msg.mentions.users.first().id)
            chanToJoin = target.voice.channel
        }
        else{
            chanToJoin = msg.member.voice.channel
        }

        if (!chanToJoin) return msg.channel.send(Util.Reply.errorEmbed('Mmm...', "I can't find you..."))
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