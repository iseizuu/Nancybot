const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    aliases: ['pong'],
    description: 'Show ping latency',
    cooldown: 5,
    run: async (client, msg) => {

        const m = await msg.channel.send(`Ping`);
        let embed = new MessageEmbed()
        .setTitle('Pong!')
        .setDescription(`🚩 : **Latency ${Math.floor(m.createdTimestamp - msg.createdTimestamp)}**\n🌐 : **Client ${client.ws.ping}**`)
        .setFooter(msg.author.username)
        .setTimestamp()
        msg.channel.send(embed)
        await m.delete();
    }
}