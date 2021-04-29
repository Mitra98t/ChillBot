const Util = require('../utility')

module.exports = {
    name: 'join',
    description: 'I am coming',
    execute(msg, args, discord) {
        if(Util.Check.isInVoiceChannel(msg.guild.me)){
            return msg.channel.send(Util.Reply.errorEmbed("I'm already in use", "I'm playing something elsewhere!\nI need my own spaces..."));   
        }

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
            let song = chooseFile(msg, './files/audio', args[0])
            const dispatcher = connection.play(song);
            dispatcher.on("finish", finish => msg.guild.me.voice.channel.leave());
        }).catch(e => {
            console.error(e);
        });

    }
}

function chooseFile(msg, path, categ){
    let dir = path + '/' + (!categ ? "meme" : categ.toLowerCase());
    let pool = Util.Utility.getCurrentFilenames(dir)
    let chosenSong = pool[Math.floor(Math.random() * pool.length)]
    return dir + '/' + chosenSong
}