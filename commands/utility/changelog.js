const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');
const { shorten, base64, embedURL } = require('../../structures/Util');

module.exports = {
    name: 'changelog',
    aliases: ['update','clog'],
    description: 'Show the latest commits from github',
	run: async (client, msg) => {
        try {
        const { body } = await request
		.get(`https://api.github.com/repos/VeguiIzumi/Nancybot/commits`)
		.set({ Authorization: `Basic ${base64(`VeguiIzumi:${process.env.PW_GITHUB}`)}` });
        const commits = body.slice(0, 10);
        const embed = new MessageEmbed()
            .setAuthor('Github', 'https://cdn.iconscout.com/icon/free/png-256/github-153-675523.png')
	    .setTitle(`[Nancybot:master] Latest 10 commits`)
            .setColor('#cce7e8')
            .setURL(`https://github.com/VeguiIzumi/Nancybot/commits/master`)
            .setFooter(msg.author.tag)
            .setTimestamp()
	    .setDescription(commits.map(commit => {
        const hash = embedURL(`\`${commit.sha.slice(0, 7)}\``, commit.html_url, false);
        return `${hash} ${shorten(commit.commit.message.split('\n')[0], 50)} - VeguiIzumi`;}).join('\n'));
        msg.channel.send(embed)
            } catch (er) {
                msg.channel.send(er);
            }
	} //klo username dan repo name ga mau keliatan ya tinggal pindah ke .env 
};
