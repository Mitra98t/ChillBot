module.exports = {
    name: 'stop',
    description: 'Ok... me ne vado',
    execute(msg, args, discord){
        if(msg.guild.me.voice.channel == null){
            return msg.channel.send(Util.Reply.sendBaseEmbed('Ma scusa!', 'Non sto facendo niente!'))
        }
        else{
            msg.guild.me.voice.channel.leave()
        }
    }
}
