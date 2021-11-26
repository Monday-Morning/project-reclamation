const nodemailer = require('nodemailer');
const logger = require('../utils/logger')('nodemailer');

let transporter = null;

// TODO: Setup transporter queue - https://nodemailer.com/smtp/pooled/#eventidle
// TODO: Setup DKIM - https://nodemailer.com/dkim/
// TODO: Setup DSN use - https://nodemailer.com/smtp/dsn/

module.exports = {
  init: () => {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE_FLAG,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
      pool: true,
    });

    transporter.verify((e, _) => {
      if (e) {
        logger.error('Could not initialize nodemailer', e);
      } else {
        logger.info('NodeMailer Initialized');
      }
    });
  },

  /**
   * @type {nodemailer.Transporter}
   */
  transporter,

  close: () => transporter?.close(),
};
