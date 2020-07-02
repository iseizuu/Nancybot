const { MessageEmbed }= require("discord.js");
const { exec } = require("child_process");
module.exports = {
    name: "execute",
    description: "You know bash?",
    usage: "Owner Only",
    aliases: ["exec","ex"],
    run: async (client, message, args) => {
        if (message.author.id !== '271576733168173057') return message.channel.send('Owner!!!');
        if (!args.join(" ")) return message.channel.send('Query kosong');
        const mu = Date.now();
        const command = `\`\`\`bash\n${args.join(" ")}\`\`\``;
        const emb = new MessageEmbed()
        .setColor("RANDOM")
        .addField("📥 INPUT", command);
        exec(args.join(" "), async (error, stdout, stderr) => {
  	        if (stdout) {
	  	        let output = `\`\`\`bash\n${stdout}\`\`\``;
	  	        if (stdout.length > 1024) {
                    output = await client.util.hastebin(stdout);
		    }
      emb.addField("📤OUTPUT", output);
  	} else if (stderr) {
  	        emb.setColor('#ffb0d7')
	  	    let error = `\`\`\`bash\n${stderr}\`\`\``;
	  	    if (stderr.length > 1024) {
                error = await client.util.hastebin(stderr);
		}
      emb.addField("⛔ERROR", error);
  	} else {
	  	emb.addField("📤OUPUT", "```bash\n# Command executed successfully but returned no output.```");
  	}
	  return message.channel.send(emb.setFooter(`⏱️ ${Date.now() - mu}mμ`));
  });
  }
}