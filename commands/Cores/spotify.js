const { MessageEmbed } = require('discord.js'); //THIS CODE WILL BLOW YOUR MIND
const { getPreview } = require('spotify-url-info');
const { createCanvas, loadImage, registerFont } = require('canvas');
const req = require('node-superfetch')
const path = require('path')
registerFont(path.join(__dirname, '..', '..', 'cores', 'fonts', 'Noto-Bold.ttf'), {family: 'Noto-Bold'})
registerFont(path.join(__dirname, '..', '..', 'cores', 'fonts', 'Noto-Regular.ttf'), {family: 'Noto-Regular'});
module.exports = {
    name: 'spotify',
    aliases: ['splay'],
    description: 'Show Detailed Spotify Tracks On Users while running presence',
    cooldown: 5,
    run: async (client, msg, args) => {
        const user =  msg.mentions.members.first() || msg.guild.members.cache.get(args[0]) || msg.member;
        let spotify = user.presence.activities.find(a => a.type == 'LISTENING')

        if(!spotify || spotify.name !== 'Spotify') return msg.channel.send({embed: {color: 'RED', description: `Whoopsss, ${user.user.tag} Is not Listening Spotify right now!`}});
        const tracks = await getPreview(`https://open.spotify.com/track/${spotify.syncID}`);
           
        if(args.includes("--canvas")) {
            const ava = user.user.displayAvatarURL({size: 2048, dynamic: true, format: 'png'})
            const wait = await msg.channel.send({embed: { description: 'Wait, Im screenshoting spotify display from my developer phone' }})
            const resultAva = await req.get(tracks.image)
            const avaEnd = await loadImage(resultAva.body)
            const base = await loadImage(path.join(__dirname, '..', '..', 'cores', 'img', 'spotipi.png'));
            const canvas = createCanvas(base.width, base.height)
            const ctx = canvas.getContext('2d');
            ctx.drawImage(avaEnd, 50, 320 ,1000, 1000)
            ctx.drawImage(base, 0, 0)
            ctx.textAlign = 'center'
            ctx.font = '45px Noto-Bold'
            ctx.fillStyle = '#ffffff'
            ctx.fillText(client.user.username, 550, 130)
            ctx.textAlign = 'left'
            ctx.font = '58px Noto-Bold'
            ctx.fillStyle = '#ffffff'
            ctx.fillText(tracks.title.length > 28 ? tracks.title.substring(0, 28).trim() + "..." : tracks.title, 95, 1650)
            ctx.font = '48px Noto-Regular'
            ctx.fillText(tracks.artist.length > 38 ? tracks.artist.substring(0, 38).trim() + "..." : tracks.artist, 95, 1710)
            await wait.edit({embed: {description: 'Almost Done!'}}).then(z => z.delete({timeout: 1000}))
            return msg.channel.send({files: [{attachment: canvas.toBuffer(), name: 'Spotify.png'}]})
        }
        var embed = new MessageEmbed()
        .setAuthor('Spotify', 'https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-download-logo-30.png')
        .setURL(tracks.link)
        .setColor('RANDOM')
        .setTitle(tracks.title)
        .setDescription(``)
        .addField('Artist :', tracks.artist, true)
        .addField('Track :', tracks.track, true)
        .addField ('Type :', tracks.type, true)
        .addField('Preview Track', `[Download](${tracks.audio})`, true)
        .addField('Spotify Embed', `[Click Here To View](${tracks.embed})`, true)
        .addField('Listener', user.user.username, false)
        .setThumbnail(tracks.image)
        .setFooter(`Requsted By : ${user.user.username}`)
        .setTimestamp()
        return msg.channel.send(embed)

    }
}