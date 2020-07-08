const { createCanvas, loadImage, registerFont } = require('canvas');
const req = require('node-superfetch')
const path = require('path')
registerFont(path.join(__dirname, '..', '..', 'cores', 'fonts', 'Noto-Bold.ttf'), {family: 'Noto-Bold'})
registerFont(path.join(__dirname, '..', '..', 'cores', 'fonts', 'Noto-Regular.ttf'), {family: 'Noto-Regular'});
registerFont(path.join(__dirname, '..', '..', 'cores', 'fonts', 'Heroes Legend.ttf'), { family: 'Heroes Legend' });

module.exports = {
    name: 'custom-spotify',
    aliases: ['cs', 'spotifygen'],
    description: 'Generate a Spotify screenshot image as you',
    usage: 'custom-spotify <title>',
    cooldown: 5,
    run: async (client, msg, args) => {
        const title = args.join(" ")
        if(!title) return msg.channel.send('You must write the title of your song')
        const maxLen = 15; // You can modify the max characters here
        if (title.length > maxLen) {
          return msg.channel.send({ embed: {
            color: 'RED',
            title: '<a:nonono:709741696153419776> Woopsss!!',
            description: `${msg.author}, Who the hell write title so long like that?`
          } });
        }
        if(msg.mentions.members.first() || msg.guild.members.cache.get(args[0])) return
        const tag = msg.author
        const ava = tag.displayAvatarURL({size: 2048, dynamic: true, format: 'png'})
        try {
            const wait = await msg.channel.send({embed: {
                description: 'Wait, Im screenshoting spotify display from my developer phone'
            }})
            const resultAva = await req.get(ava)
            const avaEnd = await loadImage(resultAva.body)
            const base = await loadImage(path.join(__dirname, '..', '..', 'cores', 'img', 'spotipi.png'));
            const canvas = createCanvas(base.width, base.height)
            const ctx = canvas.getContext('2d');
            ctx.drawImage(avaEnd, 50, 320 ,1000, 1000)
            ctx.drawImage(base, 0, 0)
            ctx.textAlign = 'center'
            ctx.font = '45px Noto-Bold'
            ctx.fillStyle = '#ffffff'
            ctx.fillText(client.user.username, 550, 110)
            ctx.textAlign = 'left'
            ctx.font = '58px Noto-Bold'
            ctx.fillStyle = '#ffffff'
            ctx.fillText(title, 95, 1650)
            ctx.font = '48px Noto-Regular'
            ctx.fillText(tag.username, 95, 1710)
            await wait.edit({embed: {description: 'Almost Done!'}}).then(z => z.delete({timeout: 1000}))
            return msg.channel.send({files: [{attachment: canvas.toBuffer(), name: 'Spotify.png'}]})

        } catch (er) {
            msg.channel.send(er)
            console.log(er)

        }

    }
}
