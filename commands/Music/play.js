const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'play',
    aliases: ['p'],
    description: 'Playing song',
    cooldown: 5,
    run: async (client, msg, args) => {
        if(!msg.member.voice.channel) {
            return msg.channel.send({embed : {
                description: 'You need to join voice channel first',
                color: 'RED'
            }});
        }
        try {
            const songQuery = args.join(" ");
            const song = await client.handlerManager.getSongs(`ytsearch: ${songQuery}`)
            if(!song[0]) {
                return msg.channel.send({embed: {
                    description: 'Icant find any song,,, so sad.',
                    color: 'RED'
                }});
            }
            client.handlerManager.handleVideo(msg, msg.member.voice.channel, song[0]);

        } catch(e) {
            msg.channel.send('Error' + e)
        }
    }
}
