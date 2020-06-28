const { MessageEmbed } = require('discord.js');
const listener = require('spotify-url-info');
module.exports = {
    name: 'spotify',
    aliases: ['splay'],
    description: 'Show Detailed Spotify Tracks On Users while running presence',
    cooldown: 5,
    run: async (client, msg, args) => {
        try {
        const user =  msg.mentions.members.first() || msg.guild.members.cache.get(args[0]) || msg.member;
        let spotify = user.presence.activities[0];

        if(spotify.name !== 'Spotify') return msg.channel.send({embed: {color: 'RED', description: `Whoopsss, ${user.user.tag} Is not Listening Spotify right now!`}});
        let slink = spotify.syncID;
        listener.getPreview(`https://open.spotify.com/track/${slink}`).then(tracks => {
            var embed = new MessageEmbed()
            .setAuthor('Spotify', 'https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-download-logo-30.png')
            .setURL(tracks.link)
            .setColor('RANDOM')
            .setTitle(tracks.title)
            .setDescription(``)
            .addField('Artist :', tracks.artist, true)
            .addField('Track :', tracks.track, true)
            .addField ('Type :', tracks.type, false)
            .addField('Listener', user.user.username, false)
            .addField('Download Preview Track :', `[Download](${tracks.audio})`, false)
            .addField('Spotify Embed', `[Click Here To View](${tracks.embed})`, true)
            .setThumbnail(tracks.image)
            .setFooter(`Requsted By : ${user.user.username}`)
            .setTimestamp()
            msg.channel.send(embed)
        });
        } catch (er) {
            msg.channel.send({color: 'RED', embed: {description: `Whoopsss, User are not Listening Spotify right now!`}});
        }
    }
}