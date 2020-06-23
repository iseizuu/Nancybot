require('dotenv').config();
const Client = require('./structures/Client');
const { MessageEmbed } = require('discord.js');
const nancyClient = require('./structures/Client');
const { NancyPrefix } = process.env;
const http = require('http');
const express = require('express');
const app = express();
var server = http.createServer(app);
app.get("/", (request, response) => {
  console.log('Nancy Got Pingged :)');
  response.writeHead(200, {'Content-Type': 'text/plain'})
  response.end("Anyyeong :u")
});

const listener = server.listen(process.env.PORT, function() {
  console.log(`Waiting on port ` + listener.address().port);
});
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.herokuapp.com`);
}, 280000);
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
