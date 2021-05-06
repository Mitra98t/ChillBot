const Util = require('../utility')

module.exports = {
    name: 'cat',
    description: 'Get a random cat photo', 
    execute(msg, args, discord) {
        let baseURL = 'https://cataas.com/cat'
        let saysURL = '/says/'
        let text = ""
        if(args.length){
            text = args.map(x => escape(x))
            text = text.join('%20')
        }

        if(args.length)
            msg.channel.send(Util.Reply.sendBaseImage(`Cat says: ${args.join(' ')}`,null,`${baseURL}${saysURL}${text}`))
        else
            msg.channel.send(Util.Reply.sendBaseImage('Cat',null,baseURL))
    }
}