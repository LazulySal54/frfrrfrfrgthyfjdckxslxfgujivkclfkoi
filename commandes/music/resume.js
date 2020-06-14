const { Command } = require('discord.js-commando');

module.exports = class ResumeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'resume',
      aliases: ['resume-song', 'continue'],
      memberName: 'resume',
      group: 'music',
      description: 'Reprendre la chanson en pause actuelle',
      guildOnly: true
    });
  }

  run(message) {
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('<:no:719832749761888328> | **Rejoignez un channel vocal puis réessayez**');

    if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher === null
    ) {
      return message.reply('<:no:719832749761888328> | **Il n\'y a aucune chanson en cours de lecture!**');
    }

    message.say('**Reprise de la musique** :play_pause:');

    message.guild.musicData.songDispatcher.resume();
  }
};
