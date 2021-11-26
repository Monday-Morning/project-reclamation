/**
 * @module app
 * @description The Node.js Application for Monday Morning's Project Infinity, codenamed Project Reclamation
 *
 * @requires express
 * @requires express-session
 * @requires connect-mongodb-session
 * @requires apollo-server-session
 * @requires cookie-parser
 * @requires csurf
 * @requires cors
 * @requires errorhandler - Only in development
 * @requires module:app.router
 * @requires module:app.mongoose
 * @requires module:app.firebase
 * @requires module:app.winston
 *
 * @version 0.1.0
 * @since 0.1.0
 */

require('dotenv').config({ path: `.env.${process.env.NODE_ENV || process.argv[2]?.substr(2) || 'production'}` });
const Express = require('express');
const Session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(Session);
const CORS = require('cors');
const { init: firebaseInit } = require('./config/firebase');
const { init: mongooseInit } = require('./config/mongoose');
const { cache: cacheRoles } = require('./utils/userAuth/role');
// const { init: nodemailerInit } = require('./config/nodemailer');
const apolloServer = require('./config/apolloServer');
const logger = require('./utils/logger')('app');

/**
 * @summary Express Router Object
 * @description Import and initialize the express router
 * @constant router
 *
 * @type {Express.Router}
 *
 * @see module:app.router
 */
const router = require('./router');

/** Initialize all libraries */
firebaseInit();
mongooseInit();
cacheRoles();
// nodemailerInit();

/**
 * @summary Main Express Application
 * @description Initialize Express Server
 * @constant app
 *
 * @type {Express.Express}
 */
const app = Express();

/**
 * @description Server Port
 * @constant PORT
 *
 * @type {Number}
 * @default 8080
 */
const PORT = process.env.PORT || 8080;

/**
 * @summary Cross Origin Options
 * @description Setup Cross-Origin Resource Sharing for the development environment
 * @constant CORS_OPTIONS
 *
 * @type {String}
 * @default http://localhost:3000
 */
const CORS_OPTIONS = {
  credentials: true,
  origin(origin, callback) {
    if (
      (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') &&
      (!origin ||
        origin.includes('http://localhost') ||
        origin.includes('http://127.0.0.1') ||
        origin.includes('apollographql.com'))
    ) {
      callback(null, true);
    } else if (
      process.env.NODE_ENV === 'staging' &&
      (!origin ||
        origin.includes('http://localhost') ||
        origin.includes('http://127.0.0.1') ||
        origin.includes('https://project-infinity-98561') ||
        origin.includes('https://mm.server1.dashnet.in') ||
        origin.includes('https://studio.apollographql.com'))
    ) {
      callback(null, true);
    } else if (
      [
        'https://mondaymorning.nitrkl.ac.in',
        'https://mondaymorning.nitrkl.in',
        'https://studio.apollographql.com',
      ].includes(origin)
    ) {
      callback(null, true);
    } else {
      logger.warn(`CORS blocked a request from ${origin}`);
      callback(new Error('Request blocked by CORS. Invalid source!'));
    }
  },
};
app.use(CORS(CORS_OPTIONS));

/** Use Error Handler in development environment */
if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'production') {
  app.use(require('errorhandler')());
}

/** Use Express Session and MongoDB Store for Production */
if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'production') {
  app.use(
    Session({
      secret: process.env.SESSION_SECRET,
      key: process.env.SESSION_KEY,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
    })
  );
} else {
  /**
   * @summary MongoDB Store
   * @description initialize mongodb store with required configuration
   * @constant store
   *
   * @type {MongoDBStore}
   */
  const store = new MongoDBStore({
    uri: process.env.MONGO_SESSION_URL,
    collection: 'sessionCacheStore',
    expires: 3600000, // 1 Hour
    connectionOptions: {
      maxPoolSize: 100,
      minPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
    },
  });
  store.on('error', (error) => {
    logger.error(`Error on Session Store`, error);
  });
  app.use(
    Session({
      secret: process.env.SESSION_SECRET,
      key: process.env.SESSION_KEY,
      cookie: {
        maxAge: 86400000,
      },
      store,
      resave: false,
      saveUninitialized: false,
    })
  );
}

/** Start Apollo Server and attach to Express Server */
apolloServer
  .start()
  .then(() => apolloServer.applyMiddleware({ app, path: '/v1/graph', cors: CORS_OPTIONS }))
  /** Attach Express Router */
  .then(() => app.use(router))
  /** Start Express Server on defined port */
  .then(() =>
    app.listen(PORT, (err) => {
      if (err) {
        logger.error(`Could not start Express Server on Port ${PORT}: `, err);
        return;
      }
      logger.info(`Express Server Started on Port ${PORT}.`);
    })
  )
  .then(() => logger.info(`Apollo Server started and attached at ${apolloServer.graphqlPath}`))
  .catch((err) => logger.error(`Could not start Apollo Server: `, err));

/**
 * @description Main Express Application
 * @type {Express.Express}
 */
module.exports = app;
