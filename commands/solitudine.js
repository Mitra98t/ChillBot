module.exports = {
    name: 'solitudine',
    description: 'Ora siete da soli',
    execute(msg, args, discord){
        const chatToAbuse = msg.member.voice.channel
        if (!chatToAbuse) return msg.reply('Ti è andata bene...')

        chatToAbuse.members.forEach(mem => {
            // console.log(mem.user.username)
            mem.voice.setChannel('833811919655796737')
        });
        //console.log(chatToAbuse.members)
    }
}
