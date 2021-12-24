const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');

module.exports = { 
    config: {
        name: "shuffle",
        aliases: ["mix"],
        description: "Shuffle song in queue!",
        accessableby: "Member",
        category: "music"
    },
    run: async (client, message) => {
        const msg = await message.channel.send(`**Loading please wait...**`);

		const player = client.manager.get(message.guild.id);
		if (!player) return msg.edit("No song/s currently playing within this guild.");
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")

		await player.queue.shuffle();

        const shuffle = new MessageEmbed()
            .setDescription("\`🔀\` | **Queue has been:** `Shuffle`")
            .setColor('#000001');
        
        msg.edit({ content: " ", embeds: [shuffle] });
            console.log(chalk.magenta(`[COMMAND] Shuffle used by ${message.author.tag} from ${message.guild.name}`));
    }
}