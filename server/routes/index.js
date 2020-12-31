/**
 * @module app.router
 * @description Express Router
 *
 * @requires express
 * @requires module:app.controllers.auth
 * @requires module:app.firebase
 *
 * @version 0.1.0
 * @since 0.1.0
 */

const express = require('express');
const authController = require('../controllers/auth_controller');
const { auth } = require('../config/firebase');

/**
 * @method checkUserAuth
 * @description Method to check user authentication status and validate using Firebase Admin SDK
 * @private
 * @async
 *
 * @param {Object} req Request Parameters
 * @param {Object} res Response Object
 * @param {Object} next Express Next Object
 *
 * @return {*}
 *
 * @todo Shift into auth controller
 *
 * @memberof module:app.router
 * @see module:app.firebase
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const checkUserAuth = async (req, res, next) => {
  if (!process.env.NODE_ENV) {
    return next();
  }
  if (req.headers.authorization === undefined || req.headers.authorization === null) {
    return res.json({
      error: true,
      code: 403,
      data: 'No Authorization Credential',
    });
  } else if (
    req.session.auth != null &&
    req.session.auth.key != null &&
    req.session.auth.flag &&
    req.session.auth.key != req.headers.authorization
  ) {
    return next();
  } else {
    if (req.headers.authorization == process.env.TEST_AUTH_KEY) {
      req.session.auth.key = req.headers.authorization;
      req.session.auth.flag = true;
      return next();
    }
    req.session.auth = {
      key: null,
      flag: false,
    };
    try {
      await auth.verifyIdToken(req.headers.authorization, true);
    } catch (e) {
      return res.json({
        error: e,
        code: 403,
        data: e.message || 'Access Forbidden',
      });
    }
    req.session.auth.key = req.headers.authorization;
    req.session.auth.flag = true;
    return next();
  }
};

/**
 * @summary Express Router Object
 * @description Initialize Express Router
 * @constant router
 *
 * @type {express.Router}
 */
const router = express.Router();

/** Authentication APIs */
router.post('/v1/auth/local', authController.local);
router.post('/v1/auth/google', authController.google);

router.post('/v1/auth/session', authController.start);
router.delete('/v1/auth/session', checkUserAuth, authController.end);

/** 404 Not Found - Default Response for Invalid Path */
router.use((req, res, next) => {
  res.json({
    error: true,
    code: 404,
    data: 'Page Not Found',
  });
});

module.exports = router;
