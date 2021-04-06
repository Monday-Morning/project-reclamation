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

const Express = require('express');
const Session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(Session);
const { ApolloServer } = require('apollo-server-express');
// const CookieParser = require('cookie-parser');
// const CSRF = require('csurf');
const CORS = require('cors');
const { init: firebaseInit } = require('./config/firebase');
const { init: mongooseInit } = require('./config/mongoose');
const { init: nodemailerInit } = require('./config/nodemailer');
const { GetUserAuthScope, CacheRoles } = require('./helpers/authorization');
const Winston = require('./helpers/winston');
const logger = new Winston('app');

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

/** Initialize Mongoose, Firebase and Cache Roles */
firebaseInit();
mongooseInit();
CacheRoles();
nodemailerInit();

/**
 * @summary Main Express Application
 * @description Initialize Express Server
 * @constant app
 *
 * @type {Express.Express}
 */
const app = Express();

const DEFAULT_PORT = 8080;

/**
 * @description Server Port
 * @constant PORT
 *
 * @type {Number}
 * @default 8080
 */
const PORT = process.env.PORT || DEFAULT_PORT;

/**
 * @summary Cross Origin Options
 * @description Setup Cross-Origin Resource Sharing for the development environment
 * @constant CORS_OPTIONS
 *
 * @type {String}
 * @default http://localhost:3000
 */
const CORS_OPTIONS = {
  origin:
    !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : process.env.NODE_ENV === 'staging'
      ? 'http://mm.server1.dashnet.in'
      : 'https://mondaymorning.nitrkl.ac.in',
};
app.use(CORS(CORS_OPTIONS));

/** Use Cookie Parse, JSON and Encoded URL Body Parser, and CSURF in Express */
/** 
 * Disabled CSURF as Authorization: Bearer<> header is not vulnerable
 app.use(CookieParser());
 app.use(CSRF({ cookie: true }));
 */

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
      saveUninitialized: true,
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
      useNewUrlParser: true,
      useUnifiedTopology: true,
      poolSize: 100,
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
      resave: true,
      saveUninitialized: true,
    })
  );
}

/**
 * @summary Main Apollo Server
 * @description initialize Apollo server with required configration and attach schema
 * @constant apolloServer
 *
 * @type {ApolloServer}
 */
const apolloServer = new ApolloServer({
  schema: require('./schema'),
  context: async ({ req }) => ({
    authToken: req.headers.authorization,
    // csrfToken: req.csrfToken(), // Disabled CSURF
    decodedToken: await GetUserAuthScope(req.session, req.headers.authorization),
    session: req.session,
  }),
  cors: CORS_OPTIONS,
  playground: !process.env.NODE_ENV || process.env.NODE_ENV !== 'production',
  debug: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
});

/** Attach Express Server with Apollo Server */
apolloServer.applyMiddleware({ app, path: '/v1/graph', cors: CORS_OPTIONS });

/** Attach Express Router */
app.use(router);

/** Start Express Server on defined port */
app.listen(PORT, (err) => {
  if (err) {
    logger.error(`Express Server Error on Port ${PORT}`, err);
    return;
  }
  logger.info(`Express Server Started on Port ${PORT}`);
});

/**
 * @description Main Express Application
 * @type {Express.Express}
 */
module.exports = app;
