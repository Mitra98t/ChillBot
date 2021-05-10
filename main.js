require('dotenv').config()
const TOKEN = process.env['TOKEN']
const discord = require('discord.js');
const keepAlive = require('./server');
const client = new discord.Client();
const pfx = '_';

const fs = require('fs');

client.commands = new discord.Collection();
const commandFile = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


//INIT
/* creates the list of usable commands */
for (file of commandFile) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

//STARTIN
client.once('ready', () => {
    console.log('ChillBot is online');
})

client.on('message', message => {
    if (!message.content.startsWith(pfx) || message.author.bot) return;

    const args = message.content.slice(pfx.length).split(/ +/);
    const command = args.shift().toLowerCase();

    switch (command) {
        case ('help'):
            client.commands.get('help').execute(message, args, discord);
            break;
        case ('ping'):
            client.commands.get('ping').execute(message, args, discord);
            break;
        case ('join'):
            client.commands.get('join').execute(message, args, discord);
            break;
        case ('leave'):
        case ('stop'):
            client.commands.get('stop').execute(message, args, discord);
            break;
        case ('randommute'):
            client.commands.get('randommute').execute(message, args, discord);
            break;
        case ('chaos'):
            client.commands.get('chaos').execute(message, args, discord);
            break;
        case ('scareme'):
            client.commands.get('scareme').execute(message, args, discord);
            break;
        case ('play'):
            client.commands.get('play').execute(message, args, discord);
            break;
        case ('cat'):
            client.commands.get('cat').execute(message, args, discord);
            break;
    }
})

keepAlive();
client.login(TOKEN);