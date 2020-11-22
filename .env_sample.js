module.exports = {
  env_development: {
    NODE_ENV: 'development',
    PORT: 3000,
    SESSION_SECRET: 'RANDOM-SESSION-SECRET',
    SESSION_KEY: 'RANDOM-SESSION-KEY',
    MONGO_SESSION_URL:
      'mongodb+srv://USERNAME:PASSWORD@PROJECT-ID.CLOUD-PROVIDER.mongodb.net/DATABASE?retryWrites=true&w=majority',
    MONGO_APP_URL:
      'mongodb+srv://USERNAME:PASSWORD@PROJECT-ID.CLOUD-PROVIDER.mongodb.net/DATABASE?retryWrites=true&w=majority',
    GCP_STORAGE_BUCKET: 'development.PROJECT-ID.appspot.com',
    TEST_AUTH_KEY: 'some-sample-jwt-token',
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
  },
};
