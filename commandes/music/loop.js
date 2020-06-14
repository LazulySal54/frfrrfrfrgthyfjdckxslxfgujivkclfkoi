const { Command } = require('discord.js-commando');

module.exports = class LoopCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'loop',
      group: 'music',
      memberName: 'loop',
      guildOnly: true,
      description: 'Boucler la chanson en cours de lecture',
      args: [
        {
          key: 'numOfTimesToLoop',
          default: 1,
          type: 'integer',
          prompt: 'Combien de fois voulez-vous boucler la chanson?'
        }
      ]
    });
  }

  run(message, { numOfTimesToLoop }) {
    if (!message.guild.musicData.isPlaying) {
      return message.say('<:no:719832749761888328> | **Il n\'y a aucune chanson en cours de lecture!**');
    } else if (
      message.guild.musicData.isPlaying &&
      message.guild.triviaData.isTriviaRunning
    ) {
      return message.say('<:no:719832749761888328> | **Vous ne pouvez pas boucler sur un trivia!**');
    }

    for (let i = 0; i < numOfTimesToLoop; i++) {
      message.guild.musicData.queue.unshift(message.guild.musicData.nowPlaying);
    }

    // prettier-ignore
    message.channel.send(
      `${message.guild.musicData.nowPlaying.title} joue en boucle pendant ${numOfTimesToLoop} ${
        (numOfTimesToLoop == 1) ? 'fois' : 'fois'
      }`
    );
    return;
  }
};
