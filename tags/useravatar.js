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
e.name = `useravatar`;
e.args = `[user] [quiet]`;
e.usage = `{useravatar[;user[;quiet]]}`;
e.desc = `Returns the user's avatar. If <code>name</code> is specified, gets that user instead. If
                                <code>quiet</code> is
                                specified, if a user can't be found it will simply return the <code>name</code>`;
e.exampleIn = `Your avatar is {useravatar}`;
e.exampleOut = `Your avatar is (avatar url)`;


e.execute = async((params) => {
    for (let i = 1; i < params.args.length; i++) {
        params.args[i] =await(bu.processTagInner(params, i));
    }
    let msg = params.msg
        , args = params.args;
    var replaceString = '';
    var replaceContent = false;

    var obtainedUser = await(bu.getUser(msg, args));

    if (obtainedUser)
        replaceString = obtainedUser.avatarURL;

    else if (!args[2])
        return '';
    else
        replaceString = args[1];

    return {
        replaceString: replaceString,
        replaceContent: replaceContent
    };
});