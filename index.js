const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth({ clientId: 'owner' })
});
const moderator = new Client({
    authStrategy: new LocalAuth({ clientId: 'mod' })
})
const { prefix } = require('./config.json')
const { badword } = require('./data.json')
const { p } = prefix

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log(`\n\nBot is online\nBot Number: 1`);
});

client.on('auth_failure', message => {
    console.error('AUTH ERROR', message)
})

client.on('message', async (message) => {
    console.log('The Bot Get Message', message)


    if (message.body === (`${p}ping`) || (`${p}Ping`)) {
        await message.reply('pong');
        console.log(message.body);
    }
    if (message.body === (`${p}group`) || (`${p}Group`) || (`${p}groupinfo`) || (`${p}Groupinfo`)) {
        let msg = await message.getChat();
        if (msg.isGroup) {
            message.reply(`
            *Group Details*
            Name: ${msg.name}
            Description: ${chat.description}
            Created At: ${chat.createdAt.toString()}
            Created By: ${chat.owner.user}
            Participant count: ${chat.participants.length}
            `);
        } else {
            message.reply('Command hanya bisa dipakai di grup!');
        }
    }
    if (message.body === ('test')) {
        await message.reply('Ak udh on cuy');
        console.log(message.body);
    }
    if (message.body.startsWith('p') || ('P') || ('hallo') || ('Hallo') || ('HALLO') || ('hello') || ('Hello') || ('HELLO')) {
        await message.react('🖐');
        await message.reply('Hallo cuy');
        console.log(message.body);
    }
    if (message.body.includes('ok') || ('Ok') || ('oK') || ('OK') || ('Oke') || ('oKe') || ('okE') || ('OKE')) {
        await message.reply('kerja bagus');
        console.log(message.body);
    }
    if (message.body === ('ryuxyro')) {
        const media = await MessageMedia.fromUrl('https://raw.githubusercontent.com/RyuXyro/my-portfolio/main/assets/img/ryuxyro.png');
        console.log(message.body);
        return message.sendMessage(media);
    }
    if (message.body.includes(badword)) {
        await message.react('👎')
        await message.reply('Ga boleh berkata kasar bang!!');
        console.log(message.body);
    }
});


client.initialize();
