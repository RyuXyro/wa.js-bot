const qrcode = require('qrcode-terminal');
// const { get } = require("request-promise-native");
const fetch = require('node-fetch');
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
    console.log(`\n\n${user.username} is online\nBot Number: 1`);
    // store.save({ session: 'session-owner' });
});

client.on('auth_failure', message => {
    console.error('AUTH ERROR', message)
})

client.on('message', async (message) => {
    console.log('The Bot Get Message', message)


    if (message.body === (`${p}ping`) || (`${p}Ping`)) {
        await message.reply(`
        API PONG: ${Math.round(client.ws.ping)} ms
        Latency: ${message.createdTimestamp - Date.now()}
        `);
        console.log(message.body);
    }
    if (message.body === (`${p}group`) || (`${p}Group`) || (`${p}groupinfo`) || (`${p}Groupinfo`) || (`${p}grup`) || (`${p}Grup`)) {
        let msg = await message.getChat();
        if (msg.isGroup) {
            message.reply(`
            *Group Details*
            Name: ${msg.name}
            Description: ${msg.description}
            Created At: ${msg.createdAt.toString()}
            Created By: ${msg.owner.user}
            Participant count: ${msg.participants.length}
            `);
            console.log(message.body)
        } else {
            message.reply('Command hanya bisa dipakai di grup!');
            console.log(message.body)
        }
    }
    if (message.body === (`${p}advice`) || (`${p}Advice`)) {
        const data = await fetch('https://api.adviceslip.com/advice').then(res => res.json());
        try {
            message.reply(`
            Advice

            ${data.slip.advice}
        `)
        }
        catch (err) {
            message.reply(`Error get`)
        }

    }
    // if (message.body === ('anime')) {
    //     let option = {
    //         url: `https://kitsu.io/api/edge/anime?filter[text]=${args.join(" ")}`,
    //         method: `GET`,
    //         headers: {
    //             'Content-Type': "application/vnd.api+json",
    //             'Accept': "application/vnd.api+json"
    //         },
    //         json: true
    //     }
    //     message.sendMessage('Waitt....').then(msg => {
    //         get(option).then(body => {
    //             try {
    //                 message.reply(`
    //                 Judul: ${body.data[0].attributes.titles.en}
    //                 Synopsis: ${body.data[0].attributes.synopsis}
    //                 `)
    //             }
    //             catch (err) {
    //                 message.reply('Ga ketemu cuy')
    //             }
    //         })
    //     })
    // }
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
