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
e.name = `rb`;
e.args = ``;
e.usage = `{rb}`;
e.desc = `Will be replaced by <code>}</code> on execution.`;
e.exampleIn = `This is a bracket! {rb}`;
e.exampleOut = `This is a bracket! }`;


e.execute = async(() => {
    var replaceString = bu.specialCharBegin + 'RB' + bu.specialCharEnd;
    var replaceContent = false;


    return {
        replaceString: replaceString,
        replaceContent: replaceContent
    };
});