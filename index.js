const qrcode = require('qrcode-terminal');
// const { get } = require("request-promise-native");
// const fetch = require('node-fetch');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth({
        clientId: 'owner',
        dataPath: './login-owner'
    })
});
const moderator = new Client({
    authStrategy: new LocalAuth({
        clientId: 'mod',
        dataPath: './login-mod-1'
    })
})
const { prefix } = require('./config.json')
const { badword } = require('./data.json')
const { p } = prefix

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});
client.on('ready', () => {
    console.log(`\n\nBot is online\nBot Number: 1`);
    // store.save({ session: 'session-owner' });
});

client.on('group_join', (notification) => {
    console.log('join', notification);
    notification.reply('Some User Joined.');
});
client.on('group_leave', (notification) => {
    console.log('leave', notification);
    notification.reply('Some User Left.');
});
client.on('group_update', (notification) => {
    console.log('update', notification);
});
client.on('group_admin_changed', (notification) => {
    if (notification.type === 'promote') {
        console.log(`You were promoted by ${notification.author}`);
    } else if (notification.type === 'demote')
        console.log(`You were demoted by ${notification.author}`);
});


client.on('auth_failure', message => {
    console.error('AUTH ERROR', message)
})
client.on('disconnected', (reason) => {
    console.log('Client was logged out', reason);
});



let rejectCalls = true;

client.on('call', async (call) => {
    console.log('Call received, rejecting. GOTO Line 261 to disable', call);
    if (rejectCalls) await call.reject();
    await client.sendMessage(call.from, `[${call.fromMe ? 'Outgoing' : 'Incoming'}] Phone call from ${call.from}, type ${call.isGroup ? 'group' : ''} ${call.isVideo ? 'video' : 'audio'} call. ${rejectCalls ? 'This call was automatically rejected by the script.' : ''}`);
});

client.on('message', async (message) => {
    console.log('The Bot Get Message', message)


    if (message.body === (`${p}ping`) || (`${p}Ping`)) {
        await message.reply(`
        PONG!!!
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
    if (message.body === (`${p}cs`)) {
        await client.setDisplayName(`${args.join(" ")}`)
        message.reply('Selesai... Nama sudah diganti')
    }
    // if (message.body === (`${p}advice`) || (`${p}Advice`)) {
    //     const data = await fetch('https://api.adviceslip.com/advice').then(res => res.json());
    //     try {
    //         message.reply(`
    //         Advice

    //         ${data.slip.advice}
    //     `)
    //     }
    //     catch (err) {
    //         message.reply(`Error get`)
    //     }

    // }
    if (message.body === (`${p}info`) || (`${p}bot`)) {
        let info = client.info
        client.sendMessage(message.from, `
            *Connection info*
            User name: ${info.pushname}
            My number: ${info.wid.user}
            Platform: ${info.platform}
        `);
    }
    if (message.body === (`${p}mediainfo`) && message.hasMedia) {
        const attachmentData = await message.downloadMedia();
        message.reply(`
            *Media info*
            MimeType: ${attachmentData.mimetype}
            Filename: ${attachmentData.filename}
            Data (length): ${attachmentData.data.length}
        `);
    }
    if (message.body === `${p}resmedia` && message.hasQuotedMsg) {
        const quotedMsg = await message.getQuotedMessage();
        if (quotedMsg.hasMedia) {
            const attachmentData = await quotedMsg.downloadMedia();
            client.reply(message.from, attachmentData, { caption: 'Here\'s your requested media.' });
        }
        if (quotedMsg.hasMedia && quotedMsg.type === 'audio') {
            const audio = await quotedMsg.downloadMedia();
            await client.reply(message.from, audio, { sendAudioAsVoice: true });
        }
    }
    if (message.body === `${p}typing`) {
        const chat = await message.getChat();
        chat.sendStateTyping();
    }
    if (message.body === `${p}recording`) {
        const chat = await message.getChat();
        chat.sendStateRecording();
    }
    if (message.body === `${p}clearstate`) {
        const chat = await message.getChat();
        chat.clearState();
    }
    if (message.body === `${p}backup`) {
        await store.save({ session: 'login-owner' });
        message.reply('Done...')
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
