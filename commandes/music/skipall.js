const { Command } = require('discord.js-commando');

module.exports = class SkipAllCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'skipall',
      aliases: ['skip-all'],
      memberName: 'skipall',
      group: 'music',
      description: 'Passer toutes les chansons dans la file d\'attente',
      guildOnly: true
    });
  }

  run(message) {
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('<:no:719832749761888328> | **Rejoignez un channel vocal puis réessayez**');

    if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher == null
    ) {
      return message.reply('<:no:719832749761888328> | **Il n\'y a aucune chanson en cours de lecture!**');
    }
    if (!message.guild.musicData.queue)
      return message.say('<:no:719832749761888328> | **Il n\'y a pas de chansons en file d\'attente!**');
    message.guild.musicData.songDispatcher.end();
    message.guild.musicData.queue.length = 0; // clear queue
    return;
  }
};
