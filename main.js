require('dotenv').config();
const Client = require('./structures/Client');
const { MessageEmbed } = require('discord.js');
const nancyClient = require('./structures/Client');
const { NancyPrefix } = process.env;
const client = new Client({
    fetchAllMembers: true,
    disabledEvents: ["TYPING_START", "USER_NOTE_UPDATE"],
    disableEveryone: true
  });

  ["cmdHandler"].forEach(file => {
      require(`./structures/cmdhandler`)(client);
  });


  client.on("ready", async () =>{
    console.log(`${client.user.username} Wake up :)`);
    setInterval(async () => {
      let ran = [`Nancyy <3`];
      let dom = ran[Math.floor(Math.random() * ran.length)];
      client.user.setPresence({
        activity: {
          name: dom,
          type: "WATCHING"
        },
        status: "online"
      });
    }, 5000) // millsecond
  });
  
  client.on('message', async message => {
      let embed = new MessageEmbed()
      .setColor('RANDOM')
      .setDescription(`Anyyeong **${message.author.username}**, i still running on heavy development\n prefix ${NancyPrefix}`)
      if (message.content === `<@!${client.user.id}>` || message.content === `<@${client.user.id}>`)
  return message.channel.send(embed);
  });

  

client.login(process.env.TOKEN)
