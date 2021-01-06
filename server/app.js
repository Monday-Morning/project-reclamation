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

var express = require('express')
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const { ApolloServer } = require('apollo-server-express');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const cors = require('cors');
const winston = require('./config/winston');

/**
 * @summary Express Router Object
 * @description Import and initialize the express router
 * @constant router
 *
 * @type {express.Router}
 *
 * @see module:app.router
 */
const router = require('./routes');

/** Initialize Mongoose and Firebase */
require('./config/mongoose');
require('./config/firebase');

/**
 * @summary Main Express Application
 * @description Initialize Express Server
 * @constant app
 *
 * @type {express.Express}
 */
const app = express();

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
 * @constant corsOptions
 *
 * @type {String}
 * @default http://localhost:3000
 */
const corsOptions = {
  origin:
    !process.env.NODE_ENV || process.env.NODE_ENV !== 'production'
      ? 'http://localhost:3000'
      : 'https://mondaymorning.nitrkl.ac.in',
};
app.use(cors(corsOptions));

/** Use Cookie Parse, JSON and Encoded URL Body Parser, and CSURF in Express */
app.use(cookieParser());
app.use(csrf({ cookie: true }));

/** Use Error Handler in development environment */
if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'production') {
  app.use(require('errorhandler')());
}

/** Use Express Session and MongoDB Store for Production */
if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'production') {
  app.use(
    session({
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
    expires: 1000 * 60 * 60 * 24 * 5,
    connectionOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      poolSize: 100,
      serverSelectionTimeoutMS: 10000,
    },
  });
  store.on('error', function (error) {
    winston.error(new Error(`Reclamation Server | App | Error on Session Store`), error);
  });
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      key: process.env.SESSION_KEY,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 1,
      },
      store: store,
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
  schema: require('./gql/schema'),
  context: ({ req, res }) => ({
    authToken: req.headers.authorization,
    csrfToken: req.csrfToken(),
    authScope: true, //TODO: function to check and append auth scopes from req.headers.authrorization
  }),
  cors: corsOptions,
  playground: !process.env.NODE_ENV || process.env.NODE_ENV !== 'production',
  debug: !process.env.NODE_ENV || process.env.NODE_ENV !== 'production',
});

/** Attach Express Server with Apollo Server */
apolloServer.applyMiddleware({ app, path: '/v1/graph', cors: corsOptions });

/** Attach Express Router */
app.use(router);

/** Start Express Server on defined port */
app.listen(PORT, function (err) {
  if (err) {
    winston.error(new Error(`Reclamation Server | App | Express Server Error on Port ${PORT}`), err);
    return;
  }
  winston.info(`Reclamation Server | App | Express Server Started on Port ${PORT}`);
});

/**
 * @description Main Express Application
 * @type {express.Express}
 */
module.exports = app;
