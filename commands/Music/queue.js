const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'queue',
    aliases: ['q'],
    description: 'Display Song queue',
    cooldown: 5,
    run: async (client, msg) => {
        const song = client.handlerManager.queue.get(msg.guild.id);
        if(!song) {
            return msg.channel.send({embed: {
                description: 'Song is Empty',
                color: 'RED'
            }});
        }
        try {
            const arrTitle = [];
            song.songs.map(inf => {arrTitle.push(inf.info.title)});
            var embed = new MessageEmbed()
            .setTitle(`Queue in ${msg.guild.name}`)
            .setColor('RANDOM')
            for (let i = 0; i < arrTitle.length; i++) {
                embed.addField(`${i + 1}.` , arrTitle[i]);
            }
            msg.channel.send(embed)

        } catch(e) {
            msg.channel.send({embed: {
                description: 'Oh no Error' + e,
                color: 'RED'
            }})
        }
    }
}
