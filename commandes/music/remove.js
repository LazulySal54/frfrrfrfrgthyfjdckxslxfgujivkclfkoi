const { Command } = require('discord.js-commando');

module.exports = class RemoveSongCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'remove',
      memberName: 'remove',
      group: 'music',
      description: 'Supprimer une chanson spécifique de la file d\'attente',
      guildOnly: true,
      args: [
        {
          key: 'songNumber',
          prompt: 'What song number do you want to remove from queue?',
          type: 'integer'
        }
      ]
    });
  }
  run(message, { songNumber }) {
    if (songNumber < 1 && songNumber >= message.guild.musicData.queue.length) {
      return message.reply('<:no:719832749761888328> | **Veuillez entrer un numéro de chanson valide**');
    }
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('<:no:719832749761888328> | **Rejoignez un channel vocal puis réessayez**');

    if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher == null
    ) {
      return message.reply('<:no:719832749761888328> | **Il n\'y a aucune chanson en cours de lecture!**');
    }

    message.guild.musicData.queue.splice(songNumber - 1, 1);
    return message.say(`<:yes:719832750177124413> | **Suppression du morceau n°${songNumber} de la file d'attente**`);
  }
};
