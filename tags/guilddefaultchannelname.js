var e = module.exports = {};
var bu;

var bot;
e.init = (Tbot, blargutil) => {
    bot = Tbot;
    bu = blargutil;

    e.category = bu.TagType.SIMPLE;
};

e.requireCtx = require;

e.isTag = true;
e.name = `guilddefaultchannelname`;
e.args = ``;
e.usage = `{guilddefaultchannelname}`;
e.desc = `Returns the guild's default channel's name`;
e.exampleIn = `Default channel is {guilddefaultchannelname}`;
e.exampleOut = `Default channel is defaultchannel`;


e.execute = (msg, args, fallback) => {
    var replaceString = msg.channel.guild.defaultChannel.name;
    var replaceContent = false;


    return {
        replaceString: replaceString,
        replaceContent: replaceContent
    };
};