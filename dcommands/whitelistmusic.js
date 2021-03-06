var e = module.exports = {};
var bu;

var bot;
e.init = (Tbot, blargutil) => {
    bot = Tbot;
    bu = blargutil;

    e.category = bu.CommandType.CAT;

};

e.requireCtx = require;

e.isCommand = true;
e.hidden = false;
e.usage = '';
e.info = '';

e.execute = (msg) => {
    if (msg.author.id == bu.CAT_ID) {
        if (bu.config.discord.musicGuilds[msg.channel.guild.id]) {
            bu.config.discord.musicGuilds[msg.channel.guild.id] = false;
            bu.sendMessageToDiscord(msg.channel.id, `Music disabled for ${msg.channel.guild.name}`);
        } else {
            bu.config.discord.musicGuilds[msg.channel.guild.id] = true;
            bu.sendMessageToDiscord(msg.channel.id, `Music enabled for ${msg.channel.guild.name}`);
        }
    }
    bu.saveConfig();
};
