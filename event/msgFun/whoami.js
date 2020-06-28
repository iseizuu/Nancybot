
module.exports = client => {

    client.on('message', async msg => {
        if(msg.channel.name === 'who-am-i') {
            if(msg.author.discriminator === '0000') return
            msg.delete()
            let ppl = msg.guild.members.cache.random().user;
            let chat = msg.content;
            const channel = client.channels.cache.get('726786112126713876');
            const webhooks = await channel.fetchWebhooks();
            const webhook = webhooks.first();
        
            await webhook.send(chat, {
                    username: ppl.username,
                    avatarURL: ppl.displayAvatarURL(),
                });
            }
    })
}