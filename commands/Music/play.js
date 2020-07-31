const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'play',
    aliases: ['p'],
    description: 'Playing song',
    cooldown: 5,
    run: async (client, msg, args) => {
        const voiceChannel = msg.member.voice.channel;
        if(!voiceChannel) {
            return msg.channel.send({embed : {
                description: 'You need to join voice channel first',
                color: 'RED'
            }});
        }
        if(client.handlerManager.queue.has(msg.guild.id) && voiceChannel.id !== client.handlerManager.queue.get(msg.guild.id).voiceChannel.id){
            return msg.channel.send({embed : {
                description: 'You need to join same voice channel with me',
                color: 'RED'
            }});
        }
        try {
            const songQuery = args.join(" ");
            if(!songQuery[0]) {
                return msg.channel.send({embed: {
                    description: 'Missing Query :( \ntype help <play>',
                    color: 'RED'
                }});
            }
            const song = await client.handlerManager.getSongs(`ytsearch: ${songQuery}`);
            if(!song[0]) {
                return msg.channel.send({embed: {
                    description: 'I can\'t find any song,,, so sad.',
                    color: 'RED'
                }});
            }
            client.handlerManager.handleVideo(msg, msg.member.voice.channel, song[0]);

        } catch(e) {
            msg.channel.send('Error' + e)
        }
    }
}
