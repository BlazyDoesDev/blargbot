var e = module.exports = {};
var bu;

var bot;
e.init = (Tbot, blargutil) => {
    bot = Tbot;
    bu = blargutil;
    e.category = bu.CommandType.ADMIN;
};
e.isCommand = true;
e.requireCtx = require;

e.hidden = false;
e.usage = 'hackban <user...> [days]';
e.info = 'Bans a user who isn\'t currently on your guild, where `<user...>` is a list of user IDs or mentions (separated by spaces) and `days` is the number of days to delete messages for (defaults to 1).\nIf mod-logging is enabled, the ban will be logged.';
e.longinfo = `<p>Bans a user who isn't currently on your guild, where <code>user...</code> is alist of user IDs or mentions (separated by spaces) and <code>days</code> is the number of days to delete messages for. Defaults to 1.</p>
<p>If mod-logging is enabled, the ban will be logged.</p>`;



e.execute = (msg, words, text) => {
    if (!msg.channel.guild.members.get(bot.user.id).permission.json.banMembers) {
        bu.sendMessageToDiscord(msg.channel.id, `I don't have permission to ban users!`);
        return;
    }
    if (!msg.member.permission.json.banMembers) {
        bu.sendMessageToDiscord(msg.channel.id, `You don't have permission to ban users!`);
        return;
    }
    let parsedList = words.splice(1).join(' ').split(/ +/);
    let userList = [];
    let days = 1;
    for (let i = 0; i < parsedList.length; i++) {
        if (parsedList[i]) {
            if (/[0-9]{17,21}/.test(parsedList[i])) {
                userList.push(parsedList[i].match(/([0-9]{17,21})/)[1]);
            } else if (i == parsedList.length - 1) {
                days = parseInt(parsedList[i]);
                if (isNaN(days)) {
                    days = 1;
                }
            }
        }
    }

    if (!bu.bans[msg.channel.guild.id])
        bu.bans[msg.channel.guild.id] = {};
    if (userList.length == 1)
        bu.bans[msg.channel.guild.id][userList[0]] = { mod: msg.author, type: 'Hack-Ban' };
    else
        bu.bans[msg.channel.guild.id].mass = { mod: msg.author, type: 'Mass Hack-Ban', users: userList, newUsers: [] };

    userList.forEach(m => {
        bot.banGuildMember(msg.channel.guild.id, m, days).then(() => {
            return;
        }).catch(bu.logger.error);
    });

    bu.sendMessageToDiscord(msg.channel.id, ':ok_hand:');


    //bot.ban

};
