const { log } = require("../../../logs");
const config = require('../../assets/json/_config/config.json');

function errorhandler({err, message, channel, fatal}) {
    if(config.debug) console.log(err);
    else if(fatal && log) log.fatal(err);
    if(channel) return channel.send(message).catch(err => {});
    else return;
}

module.exports = {errorhandler}