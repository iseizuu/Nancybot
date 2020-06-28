const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'instant-invite',
    aliases: ['chinvite', 'chi'],
    description: 'Creating instant invite guild',
    cooldown: 5,
    run: async (client, msg) => {
        try {
            if(!msg.member.hasPermission(['MANAGE_CHANNELS', 'CREATE_INSTANT_INVITE'])) {
                return msg.channel.send({embed: {
                    color: 'RED',
                    description: 'Whoopss, Sorry but you need \`MANAGE_CHANNELS\` and \`CREATE_INSTANT_INVITE\` permissions'
                }})
            }
            if(!msg.guild.me.hasPermission('CREATE_INSTANT_INVITE')) {
                return msg.channel.send({embed: {
                    color: 'RED',
                    description: 'Im sorry, im missing /`CREATE_INSTANT_INVITE/` permission'
                }})
            }
            let ch = await msg.channel;
            let invite = await msg.channel.createInvite()
            let embd = new MessageEmbed()
            .setTitle('✅ | Success')
            .setThumbnail(msg.guild.iconURL({dynamic: true, size: 2048}))
            .setColor('RANDOM')
            .setDescription(`
            **Channel: \`${ch.name}\`**
            **Request By: \`${msg.author.username}\`**
            **link: \`${invite}\`**`)
            msg.channel.send(embd)
            msg.channel.send(`Fast URL: ${invite}`)

        } catch (er) {
            msg.channel.send(`Whopps error at ${er}`)
            console.log(er)

        }

    }
}
