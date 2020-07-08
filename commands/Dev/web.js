const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
module.exports = {
    name: 'wh',
    aliases: [''],
    description: '',
    cooldown: 5,
    run: async (client, msg, args) => {
        if(msg.author.id !== '271576733168173057') return msg.channel.send('Whoops');
        const webhookClient = new Discord.WebhookClient('719033399058366525', process.env.WEBTOKEN);
        const channel = client.channels.cache.get('729234184249540699');
        const webhooks = await channel.fetchWebhooks();
        const webhook = webhooks.first();
    
        await webhook.send(args.join(" "), {
                username: 'Pixelate',
                avatarURL: 'https://cdn.monotaro.id/media/catalog/product/cache/6/image/b5fa40980320eb406ba395dece54e4a8/i/2/i2P101575650-2.jpg',
            });
        msg.channel.send('OK')
    }
}
