const Util = require('../utility')

module.exports = {
    name: 'cat',
    description: 'Get a random cat photo', // It isn't really, I just use this to try stuff.
    execute(msg, args, discord) {
        if(args.length)
            msg.channel.send(`https://cataas.com/cat/says/${args.join('⠀')}`)
        else
            msg.channel.send(`https://cataas.com/cat`)
    }
}