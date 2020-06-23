const { MessageEmbed } = require('discord.js');
const { createCanvas, loadImage, registerFont } = require('canvas');
const request = require('node-superfetch');
const path = require('path');
registerFont(path.join(__dirname, '..', '..', 'cores', 'fonts', 'Heroes Legend.ttf'), { family: 'Heroes Legend' });
module.exports = {
    name: 'wc',
    aliases: [''],
    description: '',
    cooldown: 5,
    run: async (client, msg, args) => {
        const gw = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]) || msg.member;
        const firstAvatarURL = gw.user.displayAvatarURL({ format: 'png', size: 512 });
		try {
			const firstAvatarData = await request.get(firstAvatarURL);
			const firstAvatar = await loadImage(firstAvatarData.body);
			const base = await loadImage(path.join(__dirname, '..', '..', 'cores', 'img', 'welcome.png'));
			const canvas = createCanvas(base.width, base.height);
			const ctx = canvas.getContext('2d');
			ctx.drawImage(firstAvatar, -6, 35, 400, 400);
			ctx.drawImage(base, 0, 0);
			ctx.textAlign = 'left';
			ctx.textBaseline = 'top';
			ctx.fillStyle = '#40e9ff';
			ctx.font = '24px Heroes Legend';
			ctx.fillStyle = 'black';
			ctx.fillText(gw.user.tag, 358, 288);
			ctx.font = '18px Heroes Legend';
            		ctx.fillStyle = 'white';
            		ctx.fillText(msg.guild.name, 408, 368)
			return msg.channel.send({ files: [{ attachment: canvas.toBuffer(), name: 'Nancywlcm.png' }] });
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
        }
    }
}
