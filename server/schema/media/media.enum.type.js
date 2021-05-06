const { GraphQLEnumType } = require('../scalars');

module.exports = new GraphQLEnumType({
  name: 'MediaTypeEnum',
  values: {
    IMAGE: { value: 0 },
    VIDEO: { value: 1 },
  },
});
