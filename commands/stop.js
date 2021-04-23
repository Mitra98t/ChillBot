module.exports = {
    name: 'stop',
    description: 'Ok... me ne vado',
    execute(msg, args, discord){
        if(msg.guild.me.voice.channel == null){
            msg.reply('Non sto a fa nulla')
            return null
        }
        else{
            msg.guild.me.voice.channel.leave()
        }
    }
}
