const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth_controller');
const { auth } = require('../config/firebase');

router.post('/v1/auth/local', authController.local);
router.post('/v1/auth/google', authController.google);

router.post('/v1/auth/session', authController.start);
router.delete('/v1/auth/session', checkUserAuth, authController.end);

router.use((req, res, next) => {
  res.json({
    error: true,
    code: 404,
    data: 'Page Not Found',
  });
});

async function checkUserAuth(req, res, next) {
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
      next();
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
    next();
  }
}

module.exports = router;
