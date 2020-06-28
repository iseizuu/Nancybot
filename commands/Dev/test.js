
const { MessageEmbed } = require('discord.js');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://nezumiyui:andix123456@nezumiyui-3e1av.gcp.mongodb.net/nezumiyui?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
module.exports = {
    name: 'test',
    aliases: [''],
    description: '',
    cooldown: 100,
    run: async (client, msg) => {
        if(msg.author.id !== client.owners[0].id) return msg.channel.send('Woeee')

        client.connect(err => {
          const collection = client.db("test").collection("devices");

          client.close();
        });
    }
}


