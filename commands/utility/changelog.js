const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');
const { shorten, base64, embedURL } = require('../../structures/Util');

module.exports = {
    name: 'changelog',
    aliases: ['update','clog'],
	run: async (client, msg) => {
        try {
        const { body } = await request
		.get(`https://api.github.com/repos/VeguiIzumi/simplebot/commits`)
		.set({ Authorization: `Basic ${base64(`VeguiIzumi:andix123456`)}` });
        const commits = body.slice(0, 10);
        const embed = new MessageEmbed()
		    .setTitle(`[Simplebot:master] Latest 10 commits`)
            .setColor('#cce7e8')
		    .setURL(`https://github.com/VeguiIzumi/simplebot/commits/master`)
		    .setDescription('Gatau males')
        msg.channel.send(embed)
            } catch (er) {
                msg.channel.send(er);
            }
	}
};