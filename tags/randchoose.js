var e = module.exports = {};
var bu;
const async = require('asyncawait/async');
const await = require('asyncawait/await');

var bot;
e.init = (Tbot, blargutil) => {
    bot = Tbot;
    bu = blargutil;

    e.category = bu.TagType.COMPLEX;
};

e.requireCtx = require;

e.isTag = true;
e.name = `randchoose`;
e.args = `&lt;choices...&gt;`;
e.usage = `{randchoose;choices...}`;
e.desc = `Chooses a random choice`;
e.exampleIn = `I feel like eating {randchoose;cake;pie;pudding} today.`;
e.exampleOut = `I feel like eating pudding today.`;


e.execute = async((params) => {
    let args = params.args
        , fallback = params.fallback;
    var replaceString = '';
    var replaceContent = false;
    if (args.length > 1) {
        let seed = bu.getRandomInt(1, args.length - 1);
        replaceString = await(bu.processTagInner(params, seed));
    } else {
        replaceString = await(bu.tagProcessError(params, fallback, '`Not enough arguments`'));
    }

    return {
        replaceString: replaceString,
        replaceContent: replaceContent
    };
});