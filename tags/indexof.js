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
e.name = 'indexof';
e.args = '&lt;text&gt; &lt;searchfor&gt; [start]';
e.usage = '{indexof;text;search[;start]}';
e.desc = 'Finds the index of <code>searchfor</code> in <code>text</code>, after <code>start</code>. If it\'s not found, returns -1.';
e.exampleIn = 'The index of \'o\' in \'hello world\' is {indexof;hello world;o}';
e.exampleOut = 'The index of \'o\' in \'hello world\' is 4';

e.execute = async((params) => {
    for (let i = 1; i < params.args.length; i++) {
        params.args[i] = await(bu.processTagInner(params, i));
    }
    var replaceString = '';
    var replaceContent = false;
    let parsedFallback = parseInt(params.fallback);
    let args = params.args;
    if (args.length >= 3) {
        let start;
        if (args[3]) {
            start = parseInt(args[3]);
            if (isNaN(start)) {
                if (isNaN(parsedFallback)) {
                    return {
                        replaceString: await(bu.tagProcessError(params, params.fallback, '`Not a number`')),
                        replaceContent: replaceContent
                    };
                } else {
                    start = parsedFallback;
                }
            }
        }
        replaceString = args[1].indexOf(args[2], start);
    } else {
        replaceString = await(bu.tagProcessError(params, params.fallback, '`Not enough arguments`'));
    }


    return {
        replaceString: replaceString,
        replaceContent: replaceContent
    };
});