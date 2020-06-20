const fs = require('fs');
const { Collection } = require('discord.js');
const { NancyPrefix } = process.env;
const cooldownmsg = require('../cores/cooldowns.json'); //kali aja butuh
let jeda = cooldownmsg[Math.floor(Math.random() * cooldownmsg.length)];
const categories = fs.readdirSync("./commands/");
module.exports = client => {
    client.commands = new Collection();
    client.cooldowns = new Collection();
    client.aliases = new Collection();

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
            //  cmds.run(client, msg, args);
           console.log(`${msg.author.tag} used ${NancyPrefix} ${cmd}`);

           try{
            if (!client.cooldowns.has(cmds.name)) {
              client.cooldowns.set(cmds.name, new Collection());
            }
            const now = Date.now();
            const timestamps = client.cooldowns.get(cmds.name);
            const cooldownAmount = (cmds.cooldown || 3) * 1000;
            if (timestamps.has(msg.author.id)) {
            const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;
            if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
                return msg.channel.send({embed: {
                  color: 'RANDOM',
                  description: `<a:nonono:709741696153419776> | Whoopss! ${jeda}\nElapsed : ${timeLeft.toFixed(1)} To used \`${cmds.name}\`again.`
                }});
              }
            }
            timestamps.set(msg.author.id, now);
            setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);
            } catch (er){
              msg.channel.send(`Whoops, the ${cmd} command doesn\'t exist \ni recommended to use ${NancyPrefix}help`)
              .then(m => m.delete({timeout: 5000}));
            }
            try {
                cmds.run(client, msg, args);
            } catch (error) {
              console.log('Err, Seems like people using unregistered cmd hmmm :u');
            }
       });


    try {
        categories.forEach(async (category) => {
            fs.readdir(`./commands/${category}/`, (err) => {
              if (err) return console.error(err);
              const init = async () => {
                 let Commands = fs.readdirSync(`./commands/${category}`).filter(file => file.endsWith(".js"));
                
                
                for (let file of Commands) {
                  let cmd = require(`../commands/${category}/${file}`);
                       client.commands.set(cmd.name, cmd);
                  
                      if (cmd.aliases && Array.isArray(cmd.aliases))
                      cmd.aliases.forEach(aliases => client.aliases.set(aliases, cmd.name))
          
                }
                
              };
              init();
            });
          });

    } catch (er) {
        console.log(`Error In ${er}`)
    }

}