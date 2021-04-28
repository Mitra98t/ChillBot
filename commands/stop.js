module.exports = {
    name: 'stop',
    description: "Ok... I'll stop",
    execute(msg, args, discord){
        if(msg.guild.me.voice.channel == null){
            return msg.channel.send(Util.Reply.sendBaseEmbed('Hey!', "I'm not doing anything!"))
        }
        else{
            msg.guild.me.voice.channel.leave()
        }
    }
}
