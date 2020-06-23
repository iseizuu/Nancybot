const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'uptime',
    aliases: ['up'],
    description: 'Show how long nancy wake up :u',
    cooldown: 5,
    run: async (client, msg) => {
        const owner = client.users.cache.find(x => x.id === '271576733168173057')
        const nancyHidup = process.uptime();
        const detik = Math.floor(nancyHidup % 60);
        const hari = Math.floor((nancyHidup % 31536000) / 86400);
        const jam = Math.floor((nancyHidup / 3600) % 24);
        const menit = Math.floor((nancyHidup / 60) % 60);

        msg.channel.send({embed: {
            title: client.user.username,
            fields: [
                {
                name: '📤 **Uptime**',
                value: `\`\`\`${hari} Hari, ${jam} Jam, ${menit} Menit, ${detik} Detik\.\`\`\``,
                inline: false
            },
            {
                name: '👀 **Developer**',
                value: `\`\`\`apache\n${owner.tag}\`\`\``,
                inline: false
            }
        ],
            footer: {
                text: msg.author.username
            }
        }});
    }
}