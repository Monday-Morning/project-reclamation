const { GraphQLEnumType } = require('../scalars');

module.exports = {
  ArticleTypeEnumType: new GraphQLEnumType({
    name: 'ArticleTypeEnum',
    values: {
      STANDARD: { value: 0 },
      WITSDOM: { value: 1 },
      PHOTOSTORY: { value: 2 },
    },
  }),
  PublishStatusEnumType: new GraphQLEnumType({
    name: 'PublishStatusEnum',
    values: {
      UNPUBLISHED: { value: 0 },
      PUBLISHED: { value: 1 },
      ARCHIVED: { value: 2 },
      TRASHED: { value: 3 },
    },
  }),
};
