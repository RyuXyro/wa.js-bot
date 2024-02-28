const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const client = new Client({ authStrategy: new LocalAuth() });
const { prefix } = require('./config.json')
const { badword } = require('./data.json')

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log(`Bot is online\nCode Bot: 1`);
});

client.on('message', async (message) => {
    if (message.body === (`${prefix}ping`) {
        await message.reply('pong');
        console.log(message.body);
    }
    if (message.body === ('test')) {
        await message.reply('Ak udh on cuy');
        console.log(message.body);
    }
    if (message.body === ('p')) {
        await message.react('🖐');
        await message.reply('Hallo cuy');
    }
    if (message.body.includes('ok') || ('oke') {
        await message.reply('kerja bagus');
    }
    if (message.body.includes('foto')) {
        const media = await MessageMedia.fromUrl('https://raw.githubusercontent.com/RyuXyro/my-portfolio/main/assets/img/ryuxyro.png');
        return message.sendMessage(media);
    }
    if (message.body.includes(badword)) {
        return message.reply('Ga boleh berkata kasar bang!!');
    }
});

// client.on('welcome', (welcome, message) => {
// })

client.initialize();
