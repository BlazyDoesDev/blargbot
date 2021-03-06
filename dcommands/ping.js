var bu;
var moment = require('moment');

var e = module.exports = {};

var bot;
e.init = (Tbot, blargutil) => {
    bot = Tbot;
    bu = blargutil;

    e.category = bu.CommandType.GENERAL;

};
e.requireCtx = require;

e.isCommand = true;
e.hidden = false;
e.usage = 'ping';
e.info = 'Pong!\nFind the command latency.';
e.longinfo = '<p>Pong!</p><p>Find the command latency.</p>';

var messages = [
    `Existance is a lie.`,
    `You're going to die some day, perhaps soon.`,
    `Nothing matters.`,
    `Where do you get off?`,
    `There is nothing out there.`,
    `You are all alone in an infinite void.`,
    `Truth is false.`,
    `Forsake everything.`,
    `Your existence is pitiful.`,
    `We are all already dead.`
];

e.execute = (msg) => {
    var message = messages[bu.getRandomInt(0, messages.length - 1)];
    bot.createMessage(msg.channel.id, message).then((msg2) => {
        bot.editMessage(msg2.channel.id, msg2.id, `Pong! (${msg2.timestamp - msg.timestamp}ms)\u202e`);
        return msg2;
    }).catch(err => bu.logger.error(err.stack));
};