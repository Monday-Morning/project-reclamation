module.exports = {
  env_development: {
    /**
     * @const NODE_ENV
     * @description Node environment mode
     * @global
     * @type {String}
     */
    NODE_ENV: 'development',

    /**
     * @const PORT
     * @description Server port
     * @global
     * @type {Number}
     */
    PORT: 3000,

    /**
     * @const SESSION_SECRET
     * @description MongoDB store's session secret
     * @global
     * @type {String}
     */
    SESSION_SECRET: 'RANDOM-SESSION-SECRET',

    /**
     * @const SESSION_KEY
     * @description MongoDB store's session key
     * @global
     * @type {String}
     */
    SESSION_KEY: 'RANDOM-SESSION-KEY',

    /**
     * @const MONGO_SESSION_URL
     * @description MongoDB session table access URL
     * @global
     * @type {String}
     */
    MONGO_SESSION_URL:
      'mongodb+srv://USERNAME:PASSWORD@PROJECT-ID.CLOUD-PROVIDER.mongodb.net/DATABASE?retryWrites=true&w=majority',

    /**
     * @const MONGO_APP_URL
     * @description MongoDB app table access URL
     * @global
     * @type {String}
     */
    MONGO_APP_URL:
      'mongodb+srv://USERNAME:PASSWORD@PROJECT-ID.CLOUD-PROVIDER.mongodb.net/DATABASE?retryWrites=true&w=majority',

    /**
     * @const GCP_STORAGE_BUCKET
     * @description GCP storage bucket address
     * @global
     * @type {String}
     */
    GCP_STORAGE_BUCKET: 'development.PROJECT-ID.appspot.com',

    /**
     * @const TEST_AUTH_KEY
     * @description Test JWT token for auth bypass
     * @global
     * @type {String}
     */
    TEST_AUTH_KEY: 'some-sample-jwt-token',

    /**
     * @const UUID_NAMESPACE
     * @description Application Secret Namespace for UUID v5 Generation
     * @global
     * @type {String}
     */
    UUID_NAMESPACE: 'some-generated-v4-uuid',

    /**
     * @const SMTP_HOST
     * @description SMTP Host for NodeMailer
     * @global
     * @type {String}
     */
    SMTP_HOST: 'smtp.example.com',

    /**
     * @const SMTP_POST
     * @description SMTP Port for NodeMailer
     * @global
     * @type {Number}
     */
    SMTP_POST: 000,

    /**
     * @const SMTP_SECURE_FLAG
     * @description SMTP SSH Flag for NodeMailer
     * @global
     * @type {Boolean}
     */
    SMTP_SECURE_FLAG: false,

    /**
     * @const SMTP_USERNAME
     * @description SMTP Username/Email for NodeMailer
     * @global
     * @type {String}
     */
    SMTP_USERNAME: 'some-user@example.com',

    /**
     * @const SMTP_PASSWORD
     * @description SMTP Password for NodeMailer
     * @global
     * @type {String}
     */
    SMTP_PASSWORD: 'some-password',
  },
  env_staging: {
    NODE_ENV: 'staging',
    PORT: 3000,
    SESSION_SECRET: 'RANDOM-SESSION-SECRET',
    SESSION_KEY: 'RANDOM-SESSION-KEY',
    MONGO_SESSION_URL:
      'mongodb+srv://USERNAME:PASSWORD@PROJECT-ID.CLOUD-PROVIDER.mongodb.net/DATABASE?retryWrites=true&w=majority',
    MONGO_APP_URL:
      'mongodb+srv://USERNAME:PASSWORD@PROJECT-ID.CLOUD-PROVIDER.mongodb.net/DATABASE?retryWrites=true&w=majority',
    GCP_STORAGE_BUCKET: 'staging.PROJECT-ID.appspot.com',
    UUID_NAMESPACE: 'some-generated-v4-uuid',
    SMTP_HOST: 'smtp.example.com',
    SMTP_POST: 000,
    SMTP_SECURE_FLAG: false,
    SMTP_USERNAME: 'some-user@example.com',
    SMTP_PASSWORD: 'some-password',
  },
  env_production: {
    NODE_ENV: 'production',
    PORT: 3000,
    SESSION_SECRET: 'RANDOM-SESSION-SECRET',
    SESSION_KEY: 'RANDOM-SESSION-KEY',
    MONGO_SESSION_URL:
      'mongodb+srv://USERNAME:PASSWORD@PROJECT-ID.CLOUD-PROVIDER.mongodb.net/DATABASE?retryWrites=true&w=majority',
    MONGO_APP_URL:
      'mongodb+srv://USERNAME:PASSWORD@PROJECT-ID.CLOUD-PROVIDER.mongodb.net/DATABASE?retryWrites=true&w=majority',
    GCP_STORAGE_BUCKET: 'PROJECT-ID.appspot.com',
    UUID_NAMESPACE: 'some-generated-v4-uuid',
    SMTP_HOST: 'smtp.example.com',
    SMTP_POST: 000,
    SMTP_SECURE_FLAG: false,
    SMTP_USERNAME: 'some-user@example.com',
    SMTP_PASSWORD: 'some-password',
  },
};
