const fs = require('fs');

module.exports = {
    name: 'join',
    description: 'I am coming',
    execute(msg, args, discord) {
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
            let usableFiles = getCurrentFilenames('./files/audio')
            const dispatcher = connection.play(`./files/audio/${usableFiles[Math.floor(Math.random() * usableFiles.length)]}`);
            dispatcher.on("finish", finish => msg.guild.me.voice.channel.leave());
            //console.log("Successfully connected.");
        }).catch(e => {
            console.error(e);
        });

    }
}

function getCurrentFilenames(path) {
    let res = []
    fs.readdirSync(path).forEach(file => {
        res.push(file);
    });
    return res
}