const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'skip',
    aliases: ['s'],
    description: '',
    cooldown: 5,
    run: async (client, msg) => {
        const serverQueue = client.handlerManager.queue.get(msg.guild.id);
        if(serverQueue.voiceChannel.id !== msg.member.voice.channel.id) {
            return msg.channel.send({embed: {
                description: `I cant do it, you need to join same voice channel in **${serverQueue.voiceChannel.name}**`,
                color: 'RED'
            }});
        }
        if (!serverQueue) return msg.channel.send("Queue Is empty");
        if (!serverQueue.playing) serverQueue.playing = true;
        serverQueue.skip();
        msg.react("✅")
    }
}
