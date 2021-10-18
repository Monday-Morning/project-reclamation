const Winston = require('./winston');

const logger = (logModule) => new Winston(logModule);

module.exports = logger;
