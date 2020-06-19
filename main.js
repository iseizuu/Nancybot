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
      let ran = [`Nancy Momoland <3`];
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

  client.on("message", async msg => {
  
    if(msg.author.bot) return;
    if(!msg.guild) return;
    let prefix = process.env.NancyPrefix
    if(!msg.content.startsWith(prefix)) return;
    if (!msg.member) msg.member = await msg.guild.fetchMember(msg);
    
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
        
        if (cmd.length === 0) return;
        let cmds = client.commands.get(cmd);
        if (!cmds) cmds = client.commands.get(client.aliases.get(cmd));
        if (cmds) 
            cmds.run(client, msg, args);
         console.log(`${msg.author.tag} used ${NancyPrefix} ${cmd}`);
     });

client.login(process.env.TOKEN)
