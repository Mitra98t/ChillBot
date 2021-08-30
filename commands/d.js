const Util = require('../utility')

module.exports = {
    name: 'd',
    description: 'roll Dice',
    execute(msg, args, discord) {
        let roll 
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
                return msg.channel.send(Util.Reply.errorEmbed("Wrong dice", "Use `_d <dice type>`, the types are 20, 12, 10, 8, 6, 4"))
                break;
        }

        msg.channel.send(Util.Reply.sendBaseEmbed('Rolled', `${roll}, good luck :3`))

    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
}