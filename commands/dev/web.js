const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
module.exports = {
    name: 'wh',
    aliases: [''],
    description: '',
    cooldown: 5,
    run: async (client, msg, args) => {
        if(msg.author.id !== '271576733168173057') return message.channel.send('Whoops');
        const webhookClient = new Discord.WebhookClient('719033399058366525', process.env.WEBTOKEN);
        const channel = client.channels.cache.get('724931004506046496');
        const webhooks = await channel.fetchWebhooks();
        const webhook = webhooks.first();
    
        await webhook.send(args.join(" "), {
                username: 'Pixelate',
                avatarURL: 'https://w0.pngwave.com/png/173/214/safety-computer-icons-public-security-safe-png-clip-art.png',
            });
        msg.channel.send('OK')
    }
}
