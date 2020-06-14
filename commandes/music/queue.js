const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class QueueCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'queue',
      aliases: ['song-list', 'next-songs'],
      group: 'music',
      memberName: 'queue',
      guildOnly: true,
      description: 'Afficher la file d\'attente des chansons'
    });
  }

  run(message) {
    if (message.guild.triviaData.isTriviaRunning)
      return message.say('<:no:719832749761888328> | **Réessayez après la fin du questionnaire**');
    if (message.guild.musicData.queue.length == 0)
      return message.say('<:no:719832749761888328> | **Il n\'y a pas de chansons en file d\'attente!**');
    const titleArray = [];
    /* eslint-disable */
    // display only first 10 items in queue
    message.guild.musicData.queue.slice(0, 10).forEach(obj => {
      titleArray.push(obj.title);
    });
    /* eslint-enable */
    var queueEmbed = new MessageEmbed()
      .setColor('#36393f')
      .setTitle(`:musical_note: File d'attente`);
    for (let i = 0; i < titleArray.length; i++) {
      queueEmbed.addField(`**» Musique n°**${i + 1}:`, `${titleArray[i]}`);
    }
    return message.say(queueEmbed);
  }
};
