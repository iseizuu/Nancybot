const { MessageEmbed } = require('discord.js');
const fs = require("fs");
const categories = fs.readdirSync("./commands/");
module.exports = {
    name: 'help',
    aliases: ['h','commands'],
    description: 'Display all commands of this bot',
    usage: 'help [commands]',
    cooldown: 5,

    run: async (client, msg, args) => {
        let embed = new MessageEmbed()
        .setAuthor(msg.guild.name, client.user.avatarURL())
        .setTitle(`${client.user.username} Commands`)
        .setColor('RANDOM');
        if (!args.length) {

            categories.forEach(async (category) => {
              if (category == "owner") return;
      
              const helpCommands = [ ];
              let categoryCommands = "";
              const commandsFile = fs.readdirSync(`./commands/${category}`).filter(file => file.endsWith(".js"));
              
              for (let i = 0; i < commandsFile.length; i++) {
                const commandName = commandsFile[i].split(".")[0];
                helpCommands.push(`\`${commandName}\`, `);
              }
      
              for (let i = 0; i < helpCommands.length; i++) categoryCommands += helpCommands[i];
              const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
              embed.addField(`**${categoryName} (${commandsFile.length})**`, categoryCommands );
            });
            msg.channel.send(embed);
          }

          if (!args[0]) return;
    
          let CmdName = args.join(' ');
          let Cmd = client.commands.get(CmdName);
          if (!Cmd)
            await msg.channel.send(`Command not found, if you using aliases, please no!`).then(aa => aa.delete({timeout: 6000}));
         try{
             let cmdss = args[0]
             let mbed = new MessageEmbed()
             .setColor('RANDOM')
             .setDescription(`
                **Command Name** : ${Cmd.name}
                **Aliases** : ${Cmd.aliases ? (Array.isArray(Cmd.aliases) ? Cmd.aliases.join(", ") : Cmd.aliases) : "¯\_(ツ)_/¯"}
                **Description** : ${Cmd.description ? Cmd.description : "¯\_(ツ)_/¯"}
                **Usage** : ${Cmd.usage ? Cmd.usage : "¯\_(ツ)_/¯"}`)
             .setTimestamp()
             .setFooter(msg.author.tag, msg.author.displayAvatarURL())

             await msg.channel.send("",(mbed));
            } catch (er) {
                return msg.channel.send({embed: {
                    description:  `Command ${args} Not found!`
                }});
            }

     
     


    }


}