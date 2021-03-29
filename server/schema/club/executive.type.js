const {
  GraphQLObjectType,
  GraphQLString,
  // GraphQLSchema,
  GraphQLID,
  // GraphQLList,
  // GraphQLBoolean,
  // GraphQLInt,
  // GraphQLNonNull,
  // GraphQLDate,
  // GraphQLTime,
  // GraphQLDateTime,
  // GraphQLJSON,
  // GraphQLJSONObject,
} = require('../scalars');

const ExecutiveType = new GraphQLObjectType({
  name: 'Executive',
  fields: () => ({
    id: { type: GraphQLID },
    user: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    picture: {
      type: GraphQLID,
    },
    nitrMail: {
      type: GraphQLString,
    },
    designation: {
      type: GraphQLString,
    },
  }),
});

module.exports = ExecutiveType;
