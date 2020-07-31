const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'skip',
    aliases: ['s'],
    description: '',
    cooldown: 5,
    run: async (client, msg) => {
        const serverQueue = client.handlerManager.queue.get(msg.guild.id);
        if (!serverQueue) return msg.channel.send("Queue Is empty");
        if (!serverQueue.playing) serverQueue.playing = true;
        serverQueue.skip();
        msg.react("✅")
    }
}
