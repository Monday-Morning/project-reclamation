const ENV_VARS = require('./.env.js');

module.exports = {
  apps: [
    {
      name: 'Reclamation Server',
      script: './server/app.js',
      watch: false,
      instances: 1, //TODO: change to 'max' for production
      exec_mode: 'cluster',
      max_memmory_restart: '500M',
      log_date_format: 'YYYY-MM-DD HH:MM:SS Z',
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
      combine_logs: true,
      kill_timeout: 2000,
      min_uptime: '1m',
      max_restarts: 5,
      restart_delay: 1000,
      autorrestart: true,
      cron_restart: '15 3 * * *',
      ...ENV_VARS,
    },
  ],
  deploy: {
    staging: {
      user: 'mm',
      host: 'server1.dashnet.in',
      ref: 'origin/development',
      repo: 'git@github.com:Monday-Morning/project-reclamation.git',
      path: '~/www',
      'post-deploy': 'npm install; git secret reveal; npm run start:stage;',
    },
    production: {
      user: 'github',
      host: 'mm.nitrkl.ac.in',
      ref: 'origin/production',
      repo: 'git@github.com:Monday-Morning/project-reclamation.git',
      path: '/var/www',
      'post-deploy': 'npm install --only=production; git secret reveal; npm run start:prod;',
    },
  },
};
