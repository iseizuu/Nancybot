const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'giphy',
    aliases: ['gip'],
    description: 'Searching Gif from Ghipy',
    usage: 'giphy anime',
    cooldown: 6,
    run: async (client, msg, args) => {
        try {
        let gquery = args.join(" ");
        if(!gquery) {
            return msg.channel.send({embed: {
                description: 'Whoopsss, This query can\'t be empty',
                color: 'RED'
            }})
        }
        client.fetch.get('http://api.giphy.com/v1/gifs/search')
        .query({q: gquery, apikey: process.env.Giphy_API, rating: msg.channel.nsfw ? 'r' : 'pg'}).then(res => {
            if (!res.body.data.length) return msg.channel.send('😲 Auchh...Could not find any results.');
            var img = res.body.data[Math.floor(Math.random() * res.body.data.length)].images.original;
            let embed = new MessageEmbed()
            .setAuthor('Ghiphy', 'https://img.harianjogja.com/thumb/posts/2020/05/18/1039485/e2861b0bf040ce1f178da0530afce9ed.png?w=600&h=400')
            .setColor('RANDOM')
            .setDescription(`Query : ${gquery}\n[Source HERE](${img.url})`)
            .setImage(img.url)
            msg.channel.send(embed)
        });
    } catch (er) {
        msg.channel.send(`Error ${er}`)
        console.log(er)
    }
    }
}