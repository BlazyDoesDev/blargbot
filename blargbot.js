var fs = require('fs');
var util = require('util');
var moment = require('moment-timezone');
var mkdirp = require('mkdirp');
var path = require('path');
const EventEmitter = require('events');
var reload = require('require-reload')(require);
var Cleverbot = require('cleverbot-node');
var mysql = require('mysql');
cleverbot = new Cleverbot();
var bu = require('./util.js');

class BotEmitter extends EventEmitter { }
const botEmitter = new BotEmitter();

var irc = require('./irc.js');
var discord = require('./discord.js');
var catbot = require('./catbot.js');
botEmitter.on('reloadConfig', () => {
    reloadConfig();
});
botEmitter.on('saveConfig', () => {
    saveConfig();
});
botEmitter.on('reloadDiscord', () => {
    discord.bot.disconnect(false);
    reload.emptyCache(discord.requireCtx);
    discord = reload('./discord.js');
    discord.init(VERSION, config, botEmitter, db);
});
botEmitter.on('reloadIrc', () => {
    irc.bot.disconnect('Reloading!');
    reload.emptyCache(irc.requireCtx);
    irc = reload('./irc.js');
    irc.init(VERSION, config, botEmitter);
});


/** LOGGING STUFF **/


console.log = function () {
    bu.logger.debug(arguments);
};


/** CONFIG STUFF **/
if (fs.existsSync(path.join(__dirname, 'config.json'))) {
    var configFile = fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8');
    bu.config = JSON.parse(configFile);
} else {
    bu.config = {};
    saveConfig();
}
var VERSION = bu.config.version;


function reloadConfig() {
    bu.logger.info('Attempting to reload config');
    fs.readFile(path.join(__dirname, 'config.json'), 'utf8', function (err, data) {
        if (err) throw err;
        bu.config = JSON.parse(data);
    });
}

function saveConfig() {
    fs.writeFile(path.join(__dirname, 'config.json'), JSON.stringify(bu.config, null, 4));
}

//db.serialize(function () {


//});

/**
 * Time to init the bots
 */
function init() {
    irc.init(bu, VERSION, botEmitter);
    discord.init(bu, VERSION, botEmitter);
    catbot.init(bu);
}

init();




