const { Command } = require('discord.js-commando');

module.exports = class PauseCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'pause',
      aliases: ['pause-song', 'hold', 'stop'],
      memberName: 'pause',
      group: 'music',
      description: 'Mettre en pause la chanson en cours de lecture',
      guildOnly: true
    });
  }

  run(message) {
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('<:no:719832749761888328> | **Veuillez rejoindre un channel vocal puis réessayer**');

    if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher == null
    ) {
      return message.say('<:no:719832749761888328> | **Il n\'y a aucune chanson en cours de lecture!**');
    }

    message.say('**Musique mise en pause** :pause_button:');

    message.guild.musicData.songDispatcher.pause();
  }
};
