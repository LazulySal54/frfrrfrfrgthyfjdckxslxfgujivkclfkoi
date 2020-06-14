const { Command } = require('discord.js-commando');

module.exports = class LeaveCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'leave',
      aliases: ['end'],
      group: 'music',
      memberName: 'leave',
      guildOnly: true,
      description: 'Quitte le channel vocal ou je me trouve'
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
      return message.say('<:no:719832749761888328> | **Il n\'y a pas de chansons en file d\'attente**');
    message.guild.musicData.songDispatcher.end();
    message.guild.musicData.queue.length = 0;
    return;
  }
};
