const fs = require('fs');
const { Collection } = require('discord.js');
const categories = fs.readdirSync("./commands/");
module.exports = client => {
    client.commands = new Collection();
    client.cooldowns = new Collection();
    client.aliases = new Collection();


    try {
        categories.forEach(async (category) => {
            fs.readdir(`./commands/${category}/`, (err) => {
              if (err) return console.error(err);
              const init = async () => {
                 let Commands = fs.readdirSync(`./commands/${category}`).filter(file => file.endsWith(".js"));
                
                
                for (let file of Commands) {
                  let cmd = require(`../commands/${category}/${file}`);
                       client.commands.set(cmd.name, cmd);
                  
                      if (cmd.alias && Array.isArray(cmd.aliases))
                      cmd.aliases.forEach(alias => bot.alias.set(aliases, cmd.name))
          
                }
                
              };
              init();
            });
          });

    } catch (er) {
        console.log(`Error In ${er}`)
    }

}