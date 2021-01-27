/**
 * @module app.winston
 * @description Winston (Logger) Configuration File
 *
 * @requires winston
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const { createLogger, format, transports } = require('winston');

/**
 * @description Log Format
 * @constant logFormat
 *
 * @type {format.printf}
 */
const logFormat = format.printf(
  ({ level, message, timestamp }) => `${timestamp} | Project Reclamation | ${level.toUpperCase()} | ${message}`
);

/**
 * @description Winston Options
 * @constant options
 *
 * @type {Object}
 */
const options = {
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

/**
 * @description Winston Logger
 * @constant
 *
 * @type {createLogger}
 */
module.exports =
  !process.env.NODE_ENV || process.env.NODE_ENV !== 'production'
    ? createLogger({
        transports: [new transports.Console(options.console)],
        exitOnError: false,
      })
    : createLogger({
        transports: [new transports.File(options.error), new transports.File(options.combined)],
        exitOnError: false,
      });
