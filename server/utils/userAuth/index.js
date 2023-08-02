const { admin } = require('../../config/firebase');
const { APIError, FirebaseAuthError } = require('../exception');
const UserSession = require('./session');

const SUPERADMIN_ROLES = [
  'user.superadmin',
  'article.superadmin',
  'reactions.superadmin',
  'comment.superadmin',
  'issue.superadmin',
  'session.superadmin',
  'squiggle.superadmin',
  'poll.superadmin',
  'media.superadmin',
  'album.superadmin',
  'tag.superadmin',
  'category.superadmin',
  'role.superadmin',
  'club.superadmin',
  'event.superadmin',
  'company.superadmin',
  'live.superadmin',
  'shareInternship.superadmin',
  'forum.superadmin',
];

const UserAuth = {
  /**
   * @description Authenticates a user and returns the uid
   * @function
   * @async
   *
   * @param {String} authToken JSON Web Token
   * @param {admin.Auth} _auth Firebase Authentication Library
   * @returns {Object | GraphQLError} decodedToken
   */
  authenticate: async (authToken, _auth = admin?.auth()) => {
    try {
      if (process.env.NODE_ENV === 'development' && process.env.FIREBASE_TEST_AUTH_KEY === authToken) {
        return {
          uid: '',
          exp: 4102444800, // Jan 1, 2100 at midnight
          mid: '',
          roles: SUPERADMIN_ROLES,
          email_verified: true,
        };
      }

      if (process.env.SERVER_ACCESS_API_KEY === authToken) {
        return {
          uid: '',
          exp: 4102444800, // Jan 1, 2100 at midnight
          mid: '',
          roles: SUPERADMIN_ROLES,
          email_verified: true,
        };
      }

      const _decodedToken = await _auth.verifyIdToken(authToken, true);
      return _decodedToken;
    } catch (error) {
      throw FirebaseAuthError(error);
    }
  },

  /**
   * @description Parses the auth status
   * @function
   *
   * @param req
   * @returns {NULL | Object | GraphQLError}
   */
  getContext: async (req, _auth = admin?.auth()) => {
    try {
      if (!req || !req.headers || (!req.headers.authorization && !req.headers['x-api-key'])) {
        return { authToken: null, decodedToken: null, mid: null };
      }

      const authToken = decodeURI(req.headers.authorization ?? req.headers['x-api-key']);
      if (!authToken) {
        return { authToken: null, decodedToken: null, mid: null };
      }

      if (UserSession.valid(req.session, authToken)) {
        return {
          authToken: req.session.auth.authToken,
          decodedToken: req.session.auth.decodedToken,
          mid: req.session.auth.mid,
        };
      }

      const _decodedToken = await UserAuth.authenticate(authToken, _auth);

      if (!_decodedToken) {
        return { authToken: req.headers.authorization ?? req.headers['x-api-key'], decodedToken: null, mid: null };
      }

      const { uid, exp, roles, mid } = _decodedToken;

      if (req.session) {
        req.session.auth = {
          uid,
          mid,
          authToken: req.headers.authorization ?? req.headers['x-api-key'],
          exp,
          roles,
          decodedToken: _decodedToken,
        };
        await req.session.save();
      }

      return {
        authToken: req.headers.authorization ?? req.headers['x-api-key'],
        decodedToken: _decodedToken,
        mid: _decodedToken.mid,
      };
    } catch (error) {
      throw APIError(null, error, { reason: "The server could not retrieve a user's auth scope." });
    }
  },
};

module.exports = UserAuth;
