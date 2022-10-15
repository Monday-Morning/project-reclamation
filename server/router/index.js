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

router.use('/admin/media/auth', (req, res) => {
  const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URLENDPOINT,
  });
  const authenticationParameters = imagekit.getAuthenticationParameters();
  res.send(authenticationParameters);
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
