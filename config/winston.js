const { createLogger, format, transports } = require('winston');

<<<<<<< HEAD
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} | Project Reclamation | ${level.toUpperCase()} | ${message}`;
});

var options = {
  error: {
    level: 'error',
    filename: './logs/error.log',
    format: format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
=======
var options = {
  error : {
    level:'error',
    filename:'./logs/error.log',
    format: format.combine(
      format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
      format.printf(({level, message, timestamp}) => `[${timestamp}] [${level}]: ${message}`),
    ),
>>>>>>> 6bdc41f536cdf1baa8cb603f56dad348f509b255
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    json: true,
    colorize: true,
  },
<<<<<<< HEAD
  combined: {
    level: 'info',
    filename: './logs/app.log',
    format: format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
=======
  combined : {
    level:'info',
    filename:'./logs/app.log',
    format: format.combine(
      format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
      format.printf(({level, message, timestamp}) => `[${timestamp}] [${level}]: ${message}`),
    ),
>>>>>>> 6bdc41f536cdf1baa8cb603f56dad348f509b255
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    json: true,
    colorize: true,
  },
<<<<<<< HEAD
  console: {
    level: 'debug',
    format: format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'production') {
  var logger = createLogger({
    transports: [new transports.Console(options.console)],
    exitOnError: false,
  });
} else {
  var logger = createLogger({
    transports: [new transports.File(options.error), new transports.File(options.combined)],
    exitOnError: false,
  });
}

module.exports = logger;
=======
}

var logger = createLogger({
  transports: [
    new transports.File(options.error),
    new transports.File(options.combined),
  ],
  exitOnError: false, 
});

module.exports = logger;
>>>>>>> 6bdc41f536cdf1baa8cb603f56dad348f509b255
