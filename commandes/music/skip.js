const { Command } = require('discord.js-commando');

module.exports = class SkipCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'skip',
      aliases: ['skip-song', 'advance-song'],
      memberName: 'skip',
      group: 'music',
      description: 'Passer la chanson en cours de lecture à la suivante',
      guildOnly: true
    });
  }

  run(message) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('<:no:719832749761888328> | **Rejoignez un channel vocal puis réessayez**');

    if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher == null
    ) {
      return message.reply('<:no:719832749761888328> | **Il n\'y a aucune chanson en cours de lecture!**');
    } else if (message.guild.triviaData.isTriviaRunning) {
      return message.reply(`<:no:719832749761888328> | **Vous ne pouvez pas sauter un Quiz! Utilisez "end-trivia"**`);
    }
    message.guild.musicData.songDispatcher.end();
  }
};
