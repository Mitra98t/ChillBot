module.exports = {
    name: 'join',
    description: 'I am coming',
    execute(msg, args, discord, client) {
        // const chanToJoin = client.channels.cache.get('834919038769037332')
        const userID = msg.author.id
        const chanToJoin = msg.member.voice.channel
        console.log(chanToJoin)

        if (!chanToJoin) return console.error('the channel is missing')
        chanToJoin.join().then(connection => {
            console.log("Successfully connected.");
        }).catch(e => {
            console.error(e);
        });


        setTimeout(function () {
            // msg.guild.me.voice.channel.leave();
            chanToJoin.leave();
        }, 5000);
    }
}
