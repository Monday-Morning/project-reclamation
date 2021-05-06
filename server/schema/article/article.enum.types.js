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
  StatusEnumType: new GraphQLEnumType({
    name: 'StatusEnum',
    values: {
      UNPUBLISHED: { value: 0 },
      PUBLISHED: { value: 1 },
      ARCHIVE: { value: 2 },
      TRASH: { value: 3 },
    },
  }),
};
