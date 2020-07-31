const { Rest } = require('lavacord');
const { Manager } = require('@lavacord/discord.js');
const { Collection } = require('discord.js');
const Queue = require('./managerQueue');
const config = require('../config.json');

class managerHandler {
    constructor(client){
        this.queue = new Collection();
        this.client = client;
        this.manager = new Manager(client, config.nodes,  {
            user: '723511825223909407',
            shards: client.shard ? client.shard.count : 1
        });
        this.manager.connect();
    }
    async handleVideo(message, voiceChannel, song) {
        const serverQueue = this.queue.get(message.guild.id);
        song.requestedBy = message.author;
        if (!serverQueue) {
            const queue = new Queue(this.client, {
                textChannel: message.channel,
                voiceChannel
            });
            queue.songs.push(song);
            this.queue.set(message.guild.id, queue);

            try {
                const player = await this.manager.join({
                    channel: voiceChannel.id,
                    guild: message.guild.id,
                    node: "default"
                }, {
                    //selfdeaf: true
                });
                queue.setPlayer(player);
                this.play(message.guild, song);
            } catch (error) {
                console.error(`I could not join the voice channel: ${error}`);
                this.queue.delete(message.guild.id);
                this.manager.leave(message.guild.id);
                message.channel.send(`Error when joined voice channel \n${error.message}`);
            }
        } else {
            serverQueue.songs.push(song);
            message.channel.send({embed : {
                description: `Added **${song.info.title}** to queue!`
            }});
        }
    }

    play(guild, song) {
        const serverQueue = this.queue.get(guild.id);
        if (!song) {
            serverQueue.textChannel.send({embed: {
                description: 'Im out, because song has ended',
                color: 'RANDOM'
            }});
            this.manager.leave(guild.id);
            this.queue.delete(guild.id);
        } else {
            serverQueue.player.play(song.track);
            serverQueue.player
                .once("error", console.error)
                .once("end", data => {
                    if (data.reason === "REPLACED") return;
                    const shiffed = serverQueue.songs.shift();
                    if (serverQueue.loop === true) {
                        serverQueue.songs.push(shiffed);
                    }
                    this.play(guild, serverQueue.songs[0]);
                });
            serverQueue.player.volume(serverQueue.volume);
            serverQueue.textChannel.send({embed: {
                title: '🎵 | Playing',
                description: `[${song.info.title}](${song.info.uri}) \nUploaded: ${song.info.author}`,
                color: 'GREEN',
                thumbnail: {
                    url: `https://img.youtube.com/vi/${song.info.identifier}/hqdefault.jpg`
                },
                footer: {
                    text: `Song req by: ${serverQueue.songs[0].requestedBy.username}`
                }
            }});
        }
    }

    async getSongs(query) {
        const node = this.manager.nodes.get("default");
        const result = await Rest.load(node, query);
        return result.tracks;
    }

}
module.exports = managerHandler;