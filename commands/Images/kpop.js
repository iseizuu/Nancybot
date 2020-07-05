const { MessageEmbed } = require('discord.js');
const randomPuppy = require('random-puppy')
module.exports = {
    name: 'kpop',
    aliases: ['korean-pop'],
    description: 'Show random bias or kpop images',
    cooldown: 3,
    run: async (client, msg) => {
        try {
            let ran = ['momoland', 'blackpink', 'kpop', 'twice']
            let dom = ran[Math.floor(Math.random()* ran.length)]
            randomPuppy(dom)
            .then(url => {
                let embed = new MessageEmbed()
                .setDescription(`[Images not showing? click here](${url})`)
                .setImage(url)
                .setFooter(msg.author.username)
                .setTimestamp()
                .setColor('RANDOM')
                msg.channel.send(embed);
            })
        } catch (er) {
            msg.channel.send(`Oh no error ${er.msg}`)
            
        }
    }
}

