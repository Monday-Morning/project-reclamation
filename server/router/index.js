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
const { cache } = require('../utils/userAuth/role');
const ImageKit = require('imagekit');
const UserAuth = require('../utils/userAuth');
const UserPermission = require('../utils/userAuth/permission');

/**
 * @summary Express Router Object
 * @description Initialize Express Router
 * @constant router
 *
 * @type {express.Router}
 */
const router = express.Router();

/** Updates roles cache */
router.use('/admin/roles/sync', async (_req, res) => res.send(await cache()));

router.use('/admin/media/auth', (_req, res) => {
  try {
    const imagekit = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: process.env.IMAGEKIT_URLENDPOINT,
    });
    const authenticationParameters = imagekit.getAuthenticationParameters();
    return res.status(200).send(authenticationParameters);
  } catch (error) {
    return res.status(500).json({
      data: 'The imagekit authentication paramters could not be retrived.',
      code: 500,
      error,
    });
  }
});

router.use('/auth/check', express.json(), async (req, res) => {
  try {
    const { authToken, decodedToken } = await UserAuth.getContext(req);
    if (!authToken || !decodedToken) {
      return res.status(401).json({
        data: 'The user is not authorized to access this resource.',
        code: 401,
        error: true,
      });
    }
    if (req.body.permission) {
      return res.status(200).json({
        data: await UserPermission.exists(req.session, authToken, decodedToken, req.body.permission),
        code: 200,
        error: false,
      });
    }
    return res.status(200).json({
      data: await UserPermission.getAll(req.session, authToken, decodedToken),
      code: 200,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      data: 'The user could not be authenticated.',
      code: 500,
      error,
    });
  }
});

/** 404 Not Found - Default Response for Invalid Path */
router.use((_req, res) => {
  res.json({
    error: true,
    code: 404,
    data: 'Page Not Found',
  });
});

module.exports = router;
