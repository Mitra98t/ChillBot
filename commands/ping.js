const Util = require('../utility')

module.exports = {
    name: 'ping',
    description: 'This is a FUCKING PING PONG COMMAND BABY',
    execute(msg, args, discord) {
        let embed = new discord.MessageEmbed()
            .setColor('#' + Math.floor(Math.random() * 16777215).toString(16))
            .setTitle(':ping_pong:  Pong!')
            .addField('Da invio comando a\nricezione risposta', `${Date.now() - msg.createdTimestamp}ms`, true);

        msg.channel.send(embed);
    }
}
