const { createLogger, format, transports } = require('winston');

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} | Project Reclamation | ${level.toUpperCase()} | ${message}`;
});

let options = {
  error: {
    level: 'error',
    filename: './logs/error.log',
    format: format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    json: true,
    colorize: true,
  },
  combined: {
    level: 'info',
    filename: './logs/app.log',
    format: format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    json: true,
    colorize: true,
  },
  console: {
    level: 'debug',
    format: format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'production') {
  let logger = createLogger({
    transports: [new transports.Console(options.console)],
    exitOnError: false,
  });
} else {
  let logger = createLogger({
    transports: [new transports.File(options.error), new transports.File(options.combined)],
    exitOnError: false,
  });
}

module.exports = logger;
