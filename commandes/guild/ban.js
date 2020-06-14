const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class BanCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'ban',
      aliases: ['ban-member', 'ban-hammer'],
      memberName: 'ban',
      group: 'guild',
      description: 'Bannir un membre',
      guildOnly: true,
      userPermissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS', 'BAN_MEMBERS'],
      clientPermissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS', 'BAN_MEMBERS'],
      args: [
        {
          key: 'userToBan',
          prompt:
            'Veuillez mentionner l\'utilisateur que vous souhaitez bannir (`@` ou `id`)',
          type: 'string'
        },
        {
          key: 'reason',
          prompt: 'Pourquoi voulez-vous interdire cet utilisateur?',
          type: 'string'
        }
      ]
    });
  }

  run(message, { userToBan, reason }) {
    const user =
      message.mentions.members.first() ||
      message.guild.members.fetch(userToBan);
    if (user == undefined)
      return message.channel.send('<:no:719832749761888328> | **Veuillez réessayer avec un utilisateur valide.**');
    user
      .ban(reason)
      .then(() => {
        const banEmbed = new MessageEmbed()
          .addField('<:user:710829277674733651> Bannissement de:', userToBan)
          .addField('<:gear:719832733005643787> Raison', reason)
          .setColor('#36393f');
        message.channel.send(banEmbed);
      })
      .catch(e => {
        message.say(
          '<:no:719832749761888328> | **Quelque chose s\'est mal passé en essayant de bannir cet utilisateur, je n\'ai probablement pas la permission de le bannir.**'
        );
        return console.error(e);
      });
  }
};
