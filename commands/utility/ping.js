const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    aliases: ['p'],
    description: 'Show ping latency',
    cooldown: 5,
    run: async (client, msg) => {

        const m = await msg.channel.send(`Ping`);
        let embed = new MessageEmbed()
        .setDescription(`Pong!\n🚩 Latency ${Math.floor(m.createdTimestamp - msg.createdTimestamp)}\n🌐 Client ${client.ws.ping}`)
        .setFooter('¯\_(ツ)_/¯')
        msg.channel.send(embed)
        await m.delete();
    }
}