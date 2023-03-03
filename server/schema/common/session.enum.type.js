const { GraphQLEnumType } = require('../scalars');

const SemesterEnum = new GraphQLEnumType({
  name: 'SemesterEnum',
  values: {
    AUTUMN: { value: 0 },
    SPRING: { value: 1 },
  },
});

module.exports = SemesterEnum;
