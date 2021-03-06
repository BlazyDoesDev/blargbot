var e = module.exports = {};
var bu;

const async = require('asyncawait/async');
const await = require('asyncawait/await');
var bot;
e.init = (Tbot, blargutil) => {
    bot = Tbot;
    bu = blargutil;

    e.category = bu.TagType.SIMPLE;
};

e.requireCtx = require;

e.isTag = true;
e.name = `channelid`;
e.args = ``;
e.usage = `{channelid}`;
e.desc = `Returns the ID of the current channel`;
e.exampleIn = `This channel's id is {channelid}`;
e.exampleOut = `This channel's id is 1234567890123456`;


e.execute = async((params) => {
    for (let i = 1; i < params.args.length; i++) {
        params.args[i] = await(bu.processTagInner(params, i));
    }
    var replaceString = params.msg.channel.id;
    var replaceContent = false;

    
    return {
        replaceString: replaceString,
        replaceContent: replaceContent
    };
});