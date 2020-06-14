const { Command } = require('discord.js-commando');

module.exports = class SkipToCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'skipto',
      memberName: 'skipto',
      group: 'music',
      description:
        'Passer à un morceau spécifique dans la file d\'attente, fournir le numéro du morceau comme argument',
      guildOnly: true,
      args: [
        {
          key: 'songNumber',
          prompt:
            'Quel est le numéro dans la file d\'attente de la chanson à laquelle vous souhaitez passer?, Il doit être supérieur à 1',
          type: 'integer'
        }
      ]
    });
  }

  run(message, { songNumber }) {
    if (songNumber < 1 && songNumber >= message.guild.musicData.queue.length) {
      return message.reply('<:warn:718571606695215121> | **Veuillez entrer un numéro de chanson valide**');
    }
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('<:no:719832749761888328> | **Rejoignez un channel vocal puis réessayez**');

    if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher == null
    ) {
      return message.reply('<:no:719832749761888328> | **Il n\'y a aucune chanson en cours de lecture!**');
    }

    if (message.guild.musicData.queue < 1)
      return message.say('<:no:719832749761888328> | **Il n\'y a pas de chansons en file d\'attente!**');

    message.guild.musicData.queue.splice(0, songNumber - 1);
    message.guild.musicData.songDispatcher.end();
    return;
  }
};
