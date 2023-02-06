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

require('dotenv').config({
  path: `./env/.env.${process.env.NODE_ENV || process.argv[2]?.substring(2) || 'production'}`,
});
const Express = require('express');
const Session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(Session);
const { init: firebaseInit } = require('./config/firebase');
const { init: mongooseInit } = require('./config/mongoose');
const { cache: cacheRoles } = require('./utils/userAuth/role');
// const { init: nodemailerInit } = require('./config/nodemailer');
const { cors, CORS_OPTIONS } = require('./config/cors');
const apolloServer = require('./config/apolloServer');
const logger = require('./utils/logger')('app');
const shutDownUtil = require('./utils/shutDownUtil');

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

/* Add CORS to Express */
app.use(cors);

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
        maxAge: 3600000, // 1 Hour
        secure: true,
        httpOnly: true,
        domain: 'mondaymorning.nitrkl.ac.in',
        path: '/',
        expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
      },
      store,
      resave: true,
      saveUninitialized: true,
    })
  );
}

const server = app.listen(PORT, (err) => {
  if (err) {
    logger.error(`Could not start Express Server on Port ${PORT}: `, err);
    return;
  }
  logger.info(`Express Server Started on Port ${PORT}.`);
});

const apolloApp = apolloServer(server);

apolloApp
  .start()
  .then(() => apolloApp.applyMiddleware({ app, path: '/v1/graph', cors: CORS_OPTIONS }))
  .then(() => app.use(router))
  .then(() => logger.info(`Apollo Server started and attached at ${apolloApp.graphqlPath}`))
  .catch((err) => logger.error(`Could not start Apollo Server: `, err));

process.on('SIGTERM', () => shutDownUtil('SIGTERM', server, apolloApp));
process.on('SIGINT', () => shutDownUtil('SIGINT', server, apolloApp));

/**
 * @description Main Express Application
 * @type {Express.Express}
 */
module.exports = app;
