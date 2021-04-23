module.exports = {
    name: 'randommute',
    description: 'Ok... me ne vado',
    execute(msg, args, discord) {
        const chatToAbuse = msg.member.voice.channel
        let muteRole = msg.guild.roles.cache.find(r => r.name === "Silence");

        if (!chatToAbuse) return msg.reply('Ti è andata bene...')

        chatToAbuse.members.forEach(mem => {
            if (mem.user.username == "luca_valente")
                mem.roles.add(muteRole)

        });

        setTimeout(function () {
            chatToAbuse.members.forEach(mem => {
                if (mem.user.username == "luca_valente")
                    mem.roles.remove(muteRole)
            });
        }, 5000);
    }
}
