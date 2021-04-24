module.exports = {
    name: "scareme",
    description: "Tu non mi fai paura",
    excecute(msg, args, discord){
        let embed = new discord.MessageEmbed()
            .setColor('#A0124C')
            .setTitle('Arrivo...')
        
        msg.channel.send(embed);
    }
}