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

const { stitchSchemas } = require('@graphql-tools/stitch');
const UserSchema = require('./user/user.schema');
const TagSchema = require('./tag/tag.schema');
const SquiggleSchema = require('./squiggle/squiggle.schema');
const MediaType = require('./media/media.type');
const IssueSchema = require('./issue/issue.schema');
const ContentType = require('./common/content.type');
const UserDetailType = require('./common/userDetail.type');
const CategoryMapType = require('./categoryMap/categoryMap.type');
const ArticleSchema = require('./article/article.schema');
const CompanySchema = require('./company/company.schema');
const CompanyType = require('./company/company.type');
const LiveSchema = require('./live/live.schema');
const MediaSchema = require('./media/media.schema');

module.exports = stitchSchemas({
  subschemas: [
    UserSchema,
    TagSchema,
    SquiggleSchema,
    IssueSchema,
    ArticleSchema,
    CompanySchema,
    LiveSchema,
    MediaSchema,
  ],
  types: [MediaType, ContentType, UserDetailType, CategoryMapType, CompanyType],
  mergeTypes: true,
});
