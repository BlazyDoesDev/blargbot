var e = module.exports = {};
var bu;
var bot;
const async = require('asyncawait/async');
const await = require('asyncawait/await');

e.init = (Tbot, blargutil) => {
    bot = Tbot;
    bu = blargutil;

    e.category = bu.CommandType.ADMIN;

};

e.requireCtx = require;

e.isCommand = true;
e.hidden = false;
e.usage = 'reason <caseid | latest> <reason>';
e.info = 'Sets the reason for an action on the modlog.';
e.longinfo = `<p>Sets the reason for an action on the modlog.</p>`;

e.execute = async((msg, words) => {
    let val = await(bu.guildSettings.get(msg.channel.guild.id, 'modlog'));
    if (val) {
        if (words.length >= 3) {
            var latest = false;
            if (words[1].toLowerCase() == 'latest') {
                latest = true;
            }
            words.shift();
            var caseid = parseInt(words.shift());
            bu.logger.debug(caseid);
            let storedGuild = await(bu.r.table('guild').get(msg.channel.guild.id).run());
            let modlog = storedGuild.modlog;
            let index = latest ? modlog.length - 1 : caseid;
            if (modlog.length > 0 && modlog[index]) {

                let msg2 = await(bot.getMessage(val, modlog[index].msgid))
                var content = msg2.content;
                content = content.replace(/\*\*Reason:\*\*.+?\n/, `**Reason:** ${words.join(' ')}\n`);
                modlog[index].reason = words.join(' ');
                if (!modlog[index].modid) {
                    content = content.replace(/\*\*Moderator:\*\*.+/, `**Moderator:** ${msg.author.username}#${msg.author.discriminator}`);
                    modlog[index].modid = msg.author.id;
                }
                bu.r.table('guild').get(msg.channel.guild.id).update({
                    modlog: modlog
                }).run();

                bot.editMessage(val, modlog[index].msgid, content);
                bu.sendMessageToDiscord(msg.channel.id, ':ok_hand:');
            } else {
                bu.send(msg.channel.id, 'That case does not exist!');
            }
        }
    }
});