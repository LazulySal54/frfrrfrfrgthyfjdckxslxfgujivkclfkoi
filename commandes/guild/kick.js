const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class KickCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'kick',
      aliases: ['kick-member', 'throw'],
      memberName: 'kick',
      group: 'guild',
      description: 'Expulser un membre',
      guildOnly: true,
      userPermissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS', 'BAN_MEMBERS'],
      clientPermissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS', 'BAN_MEMBERS'],
      args: [
        {
          key: 'userToKick',
          prompt: 'Qui voulez-vous expulser?',
          type: 'string'
        },
        {
          key: 'reason',
          prompt: 'Pourquoi voulez-vous expulser cet utilisateur',
          type: 'string'
        }
      ]
    });
  }

  run(message, { userToKick, reason }) {
    const user =
      message.mentions.members.first() ||
      message.guild.members.fetch(userToKick);
    if (user == undefined)
      return message.channel.send('<:no:719832749761888328> | **Veuillez réessayer avec un utilisateur valide**');
    user
      .kick(reason)
      .then(() => {
        //message.say(`Kicked ${userToKick} reason: ${reason}`)
        const kickEmbed = new MessageEmbed()
          .addField('<:user:710829277674733651> Expulsion de:', userToKick)
          .addField('<:gear:719832733005643787> Raison:', reason)
          .setColor('#36393f');
        message.channel.send(kickEmbed);
      })
      .catch(e => {
        message.say(
          '<:no:719832749761888328> | **Quelque chose s\'est mal passé en essayant d\'expulser cet utilisateur, je n\'ai probablement pas la permission de l\'expulser.**'
        );
        return console.error(e);
      });
  }
};
