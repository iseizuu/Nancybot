module.exports = {
    name: 'purge',
    aliases: ['clear', 'nuke'],
    description: 'Clear Messages',
    usage: 'purge <Number>',
    run: async (client, msg, args) => {
        try {
            if(!msg.member.hasPermission('MANAGE_CHANNELS')) {
                return msg.channel.send({embed : {
                    color: 'RED',
                    description: `Whoppss, Sorry ${msg.author.username}, but you need \`MANAGE_CHANNELS\` permissions`
                }})
            }
            let numb = args[0];
            if (isNaN(numb) || parseInt(numb) <= 0) {
                return msg.reply("Please specify the message number that you want to delete!")
            }
            let deleteAmount;

            if (parseInt(numb) > 100) {
            deleteAmount = 100;
            } else {
            deleteAmount = parseInt(numb);
            }
            msg.channel.bulkDelete(deleteAmount, true).then(apus => msg.channel.send({embed : {
                color: 'GREEN',
                description: `Yayyy,, Im deleted ${apus.size} messages`
            }}).then(dlt => dlt.delete({timeout: 5000})) )
        } catch (er) {
           msg.channel.send(`Error at ${er}`)
        }
    }
}