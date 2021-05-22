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
const { CacheRoles } = require('../helpers/authorization');

/**
 * @summary Express Router Object
 * @description Initialize Express Router
 * @constant router
 *
 * @type {express.Router}
 */
const router = express.Router();

/** Updates roles cache */
router.use('/admin/roles/sync', async (_req, res) => res.send(await CacheRoles()));

/** 404 Not Found - Default Response for Invalid Path */
router.use((req, res) => {
  res.json({
    error: true,
    code: 404,
    data: 'Page Not Found',
  });
});

module.exports = router;
