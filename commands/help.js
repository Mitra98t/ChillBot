const Util = require('../utility')

module.exports = {
    name: 'help',
    description: "I'm trying!",
    execute(msg, args, discord) {
        let embed = new discord.MessageEmbed()

        if(args.length <= 0)
            return msg.channel.send(baseHelp(embed))
        else
            return msg.channel.send(specificHelp(embed, args[0]))
    }
}

function baseHelp(embed){
    embed.setColor(Util.Colors.green)
    .setTitle('Helping <3')
    .setDescription('Here you have all commands!\nIf you want more info on one of them just type `_help <command>`')
    .addFields(
        { name: "chaos", value: "Moves everyone in the channel to random places in the server." },
        { name: "play", value: "Use `_play <youtube URL>` to play the audio." },
        { name: "join", value: "Joins the channel you are currently in, make some noise and than leaves.\nIt's possible to specify sound category to reproduce." },
        { name: "scareme", value: "Joins the channel you are currently in, scares you and than leaves." },
        { name: "stop", value: "**Alias `_leave`** Stop the bot if it's playing something and makes it leave the channel." },
    )
    return embed
}

function specificHelp(embed, spec){
    let command = spec.toLowerCase()
    embed.setColor(Util.Colors.green)
    .setTitle(command)

    switch (command){
        case ('help'):
            embed.setDescription("Really??")
            break;
        case ('join'):
            embed.setDescription("Use `_join <category> @member`\nBoth the category and the mention are optional")
            .addFields(
                { name: "category", value: "Specifies the pool from which audio will be selected\nUsable categorries are: `meme`, `To add more`" },
                { name: "mention", value: "Target a member of the server, the bot will join the channel that the target is currently in." },
            )
            break;
        case ('leave'):
        case ('stop'):
            embed.setDescription("Stop the bot if it's playing something and makes it leave the channel.")
            break;
        case ('chaos'):
            embed.setDescription("Moves everyone in the channel to random places in the server.")
            break;
        case ('scareme'):
            embed.setDescription("Joins the channel you are currently in, scares you and than leaves.")
            break;
        case ('play'):
            embed.setDescription("Use `_play <youtube URL>` to play the audio.")
            break;
        default:
            embed.setDescription("Are you sure?")
    }
    return embed
}