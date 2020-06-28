const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'adminsay',
    aliases: ['as'],
    description: '',
    cooldown: 5,
    run: async (client, msg, args) => {
        if(msg.author.id !== this.dev) return msg.channel.send('Design for developer only')
        let say = args.join(" ")
        if(!say) {
            msg.channel.send('Write the text here, im waiting on 15 second')
            msg.channel.awaitMessages(m => m.author.id == msg.author.id,
            {max: 1, time: 15000}).then(collected => {
                if (collected.first().content) {
                    msg.channel.send(collected.first().content)
                    }}).catch(() => {
                        msg.reply('Okey, command cancelled');
            });
        } else {
            msg.channel.send(say)
            msg.delete()
        }
    }
}
