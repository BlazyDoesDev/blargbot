var e = module.exports = {};
var bu;
const async = require('asyncawait/async');
const await = require('asyncawait/await');
var bot;
e.init = (Tbot, blargutil) => {
    bot = Tbot;
    bu = blargutil;
    e.category = bu.CommandType.ADMIN;
};
e.isCommand = true;
e.requireCtx = require;

e.hidden = false;
e.usage = 'ban <user> [days]';
e.info = 'Bans a user, where `days` is the number of days to delete messages for (defaults to 1).\nIf mod-logging is enabled, the ban will be logged.';
e.longinfo = `<p>Bans a user, where <code>days</code> is the number of days to delete messages for. Defaults to 1.</p>
<p>If mod-logging is enabled, the ban will be logged.</p>`;



e.execute = async((msg, words) => {
    if (!msg.channel.guild.members.get(bot.user.id).permission.json.banMembers) {
        bu.sendMessageToDiscord(msg.channel.id, `I don't have permission to ban users!`);
        return;
    }
    if (!msg.member.permission.json.banMembers) {
        bu.sendMessageToDiscord(msg.channel.id, `You don't have permission to ban users!`);
        return;
    }



    if (words[1]) {
        var user = await(bu.getUserFromName(msg, words[1]));
        if (!user) {
            bu.send(msg.channel.id, `I couldn't find that user. Try using \`hackban\` with their ID or a mention instead.`);
            return;
        }
        var botPos = bu.getPosition(msg.channel.guild.members.get(bot.user.id));
        var userPos = bu.getPosition(msg.member);
        var targetPos = bu.getPosition(msg.channel.guild.members.get(user.id));
        if (targetPos >= botPos) {
            bu.sendMessageToDiscord(msg.channel.id, `I don't have permission to ban ${user.username}!`);
            return;
        }
        if (targetPos >= userPos) {
            bu.sendMessageToDiscord(msg.channel.id, `You don't have permission to ban ${user.username}!`);
            return;
        }
        if (!bu.bans[msg.channel.guild.id])
            bu.bans[msg.channel.guild.id] = {};
        bu.bans[msg.channel.guild.id][user.id] = { mod: msg.author, type: 'Ban' };
        var deletedays = 1;
        if (words[2])
            deletedays = parseInt(words[2]);
        bot.banGuildMember(msg.channel.guild.id, user.id, deletedays).then(() => {
            bu.sendMessageToDiscord(msg.channel.id, ':ok_hand:');
        });
    }
    //bot.ban

});
