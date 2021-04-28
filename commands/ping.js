const Util = require('../utility')

module.exports = {
    name: 'ping',
    description: 'This is a F**KING PING PONG COMMAND BABY', // It isn't really, I just use this to try stuff.
    execute(msg, args, discord) {

        msg.channel.send(Util.Reply.sendBaseEmbed("Testing", "Oh look! It's working!"));
    }
}
