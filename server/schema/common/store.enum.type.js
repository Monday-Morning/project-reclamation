const { GraphQLEnumType } = require('../scalars');

const StoreEnumType = new GraphQLEnumType({
  name: 'StoreEnum',
  values: {
    ADAMANTIUM_ARCHIVE_A: {
      value: 0,
      description: 'https://ik.imagekit.io/rdjmmtest1/',
    },
    ADAMANTIUM_ARCHIVE_B: {
      value: 1,
      description: 'base_url',
    },
    ACTIVE: {
      value: 2,
      description: 'base_url',
    },
  },
});

module.exports = StoreEnumType;
