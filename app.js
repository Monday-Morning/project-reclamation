// Import all libraries
const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const { ApolloServer } = require('apollo-server-express');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const errorhandler = require('errorhandler');
const cors = require('cors');
const winston = require('./config/winston');

//TODO: use star instead of slash for docs
//TODO: error handler class

// Import router
const router = require('./routes');

// Initialize MongoDB and Firebase Admin SDK
require('./config/mongoose');
require('./config/firebase');

// Initialise Express Server and define server port
const app = express();
const PORT = process.env.PORT || 8080;

// Setup Cross-Origin Resource Sharing for the development environment
var corsOptions = {
  origin:
    !process.env.NODE_ENV || process.env.NODE_ENV !== 'production'
      ? 'http://localhost:3000'
      : 'https://mondaymorning.nitrkl.ac.in',
};
app.use(cors(corsOptions));

// Use Cookie Parse, JSON and Encoded URL Body Parser, and CSURF in Express
app.use(cookieParser());
app.use(csrf({ cookie: true }));

// Use Error Handler in development environment
if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'production') {
  app.use(errorhandler());
}

// Use Express Session (w/ MongoDB Store in Production)
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

// Initialise the Apollo Server
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

// Attach Express Server with Apollo Server
apolloServer.applyMiddleware({ app, path: '/v1/graph', cors: corsOptions });

// Attach Express Router
app.use(router);

// Start Express Server on defined port
app.listen(PORT, function (err) {
  if (err) {
    winston.error(new Error(`Reclamation Server | App | Express Server Error on Port ${PORT}`), err);
    return;
  }
  winston.info(`Reclamation Server | App | Express Server Started on Port ${PORT}`);
});

module.exports = app;
