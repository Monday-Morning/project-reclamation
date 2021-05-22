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

const { stitchSchemas } = require('graphql-tools');
const UserSchema = require('./user/user.schema');
const ArticleSchema = require('./article/article.schema');
const IssueSchema = require('./issue/issue.schema');
const SquiggleSchema = require('./squiggle/squiggle.schema');
const CategoryMapType = require('./categoryMap/categoryMap.type');
const TagType = require('./tag/tag.type');
const MediaType = require('./media/media.type');

module.exports = stitchSchemas({
  subschemas: [UserSchema, ArticleSchema, IssueSchema, SquiggleSchema],
  types: [CategoryMapType, TagType, MediaType],
  mergeTypes: true,
});
