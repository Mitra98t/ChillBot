const Util = require('../utility')

module.exports = {
    name: 'd',
    description: 'roll Dice',
    execute(msg, args, discord) {
        let diceT = 0
        let roll = 0
        if (args[0] == "custom" || args[0] == "c") {
            if (/^\d+$/.test(args[1])) {
                diceT = args[1]
                roll = getRandomInt(Number(args[1]))
            }
            else
                return msg.channel.send(Util.Reply.errorEmbed("Wrong dice", "Use `_d <dice type>`, the types are 20, 12, 10, 8, 6, 4\nUse `_d custom <dice type>` to use a custom dice eg: `_d c 35`(also `_d c <dice type>` will work"))
        }

        if (roll == 0) {
            diceT = args[0]
            switch (args[0]) {
                case "20":
                    roll = getRandomInt(20)
                    break;
                case "12":
                    roll = getRandomInt(12)
                    break;
                case "10":
                    roll = getRandomInt(10)
                    break;
                case "8":
                    roll = getRandomInt(8)
                    break;
                case "6":
                    roll = getRandomInt(6)
                    break;
                case "4":
                    roll = getRandomInt(4)
                    break;

                default:
                    return msg.channel.send(Util.Reply.errorEmbed("Wrong dice", "Use `_d <dice type>`, the types are 20, 12, 10, 8, 6, 4\nUse `_d custom <dice type>` to use a custom dice eg: `_d c 35`(also `_d c <dice type>` will work"))
                    break;
            }
        }

        if (roll == diceT)
            msg.channel.send(Util.Reply.sendBaseEmbed('Rolled', `${roll}, Very Nice UwU`, "#00FA00"))
        else if (roll == 1)
            msg.channel.send(Util.Reply.sendBaseEmbed('Rolled', `${roll}, I'm sry T_T`, "#FF0000"))
        else
            msg.channel.send(Util.Reply.sendBaseEmbed('Rolled', `${roll}, good luck :3`))

    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
}