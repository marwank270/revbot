const { Client } = require("revolt.js");
const { token, prefix } = require('./conf.json');

class ConsoleColor {

    constructor() {
        /* Retour à la mise en forme par défaut de l'interpreteur */
        this.close = '\x1b[0m'

        /** Mise en forme du texte */
        this.bold = "\x1b[1m"
        this.ita = "\x1b[3m"
        this.desa = "\x1b[2m"
        this.und = "\x1b[4m"
        this.inv = "\x1b[7m"
        this.stri = "\x1b[9m"

        /** Couleurs de la police */
        this.black = "\x1b[30m"
        this.red = "\x1b[31m"
        this.green = "\x1b[32m"
        this.yellow = "\x1b[33m"
        this.blue = "\x1b[34m"
        this.magenta = "\x1b[35m"
        this.cyan = "\x1b[36m"
        this.white = "\x1b[37m"

        /** Couleurs du fond de l'interpreteur */
        this.backBlack = "\x1b[40m"
        this.backRed = "\x1b[41m"
        this.backGreen = "\x1b[42m"
        this.backYellow = "\x1b[43m"
        this.backBlue = "\x1b[44m"
        this.backMagenta = "\x1b[45m"
        this.backCyan = "\x1b[46m"
        this.backWhite = "\x1b[47m"

        /** Custom preset RGB */
        this.backOrange = "\x1b[48;2;255;100;0m"

        /** FLAGS */
        this.askFlag = `${this.backOrange}${this.white}[ ? ]${this.close}`;
        this.warnFlag = `${this.backRed}${this.white}[ ! ]${this.close}`;
        this.info = `${this.backCyan}${this.white}[ i ]${this.close}`;

    }

    rgb(r = new Number, g = new Number, b = new Number, colorText = new Boolean) {

        /** check value **/

        if (r === undefined || g === undefined || b === undefined) return console.log(`${this.red}RGB Colors value is undefined !${this.close}`);
        if (r < 0 || g < 0 || b < 0 || r > 255 || g > 255 || b > 255) return console.log(`${this.red}RGB Colors ${this.und}must${this.close}${this.red} be integer between 0 and 255 !${this.close}`);
        if (typeof colorText !== 'boolean') return console.log(`${this.red}colorText value ${this.und}must${this.close}${this.red} be booloean !${this.close}`);
        if (typeof r !== 'number') return console.log(`${this.red}r value ${this.und}must${this.close}${this.red} be booloean !${this.close}`);
        if (typeof g !== 'number') return console.log(`${this.red}g value ${this.und}must${this.close}${this.red} be number !${this.close}`);
        if (typeof b !== 'number') return console.log(`${this.red}b value ${this.und}must${this.close}${this.red} be number !${this.close}`);


        if (colorText === true) return `\x1b[38;2;${r};${g};${b}m`;

        if (colorText === false) return `\x1b[48;2;${r};${g};${b}m`;

        else return console.log(`${this.red}undefined error !${this.close}`);

    }
}

let client = new Client();
let cc = new ConsoleColor();

client.on("ready", async () => {
    // Display infos before bot goes online
    console.info(`${cc.info} Bot online: \t ${client.user.online}`);
    console.info(`${cc.info} Logged in as: \t ${client.user.username}`);
    console.info(`${cc.info} User ID: \t\t ${client.user.id}`);
    console.info(`${cc.info} Bot is in ${cc.green}${client.servers.size()}${cc.close} Servers !`);
    console.info(`${cc.info} Bot connection failures count: ${cc.red}${client.connectionFailureCount()}${cc.close}`);

    // Edit status to connect with these values
    client.user.edit({
        status: {
            presence: "Focus",
            text: "Listening to my instruction (or not)"
        }
    })
});


client.on("messageCreate", async (message) => {

    // Ignore messages without prefixes
    if (!message.content.startsWith(prefix)) return;

    // Parse command && args
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args[0].toLowerCase();

    if (cmd === "ping") return message.reply("pong ! :ping_pong:");
});

client.loginBot(token);

// djs.bot template
/*
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/` + file);
    client.commands.set(command.name, command);
}



// On Message
client.on('message', message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    // If command exist
    if (!command) return;

    // Check if command can be executed in DM
    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply('I can\'t execute that command inside DMs!');
    }

    // Check if args are required
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nThe proper usage would be: \`${config.prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            // If user is in cooldown
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    } else {
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        // Execute command
        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
        }
    }
});

client.login(config.token);
*/