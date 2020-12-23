const { createLogger, format, transports } = require('winston');

var options = {
  error : {
    level:'error',
    filename:'./logs/error.log',
    format: format.combine(
      format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
      format.printf(({level, message, timestamp}) => `[${timestamp}] [${level}]: ${message}`),
    ),
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    json: true,
    colorize: true,
  },
  combined : {
    level:'info',
    filename:'./logs/app.log',
    format: format.combine(
      format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
      format.printf(({level, message, timestamp}) => `[${timestamp}] [${level}]: ${message}`),
    ),
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    json: true,
    colorize: true,
  },
}

var logger = createLogger({
  transports: [
    new transports.File(options.error),
    new transports.File(options.combined),
  ],
  exitOnError: false, 
});

module.exports = logger;