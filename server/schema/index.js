/**
 * @module app.schema
 * @description Compiled GraphQL Schema
 *
 * @requires graphql
 * @requires module:app.schema.query
 * @requires module:app.schema.mutation
 * @requires module:app.schema.subscription
 *
 * @version v1
 * @since 0.1.0
 */

const { mergeSchemas } = require('graphql-tools');
const UserSchema = require('./user/user.schema');
const EventSchema = require('./event/event.schema');

module.exports = mergeSchemas({
  schemas: [UserSchema, EventSchema],
});
