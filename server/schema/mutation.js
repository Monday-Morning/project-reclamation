const {
  GraphQLObjectType,
  // GraphQLString,
  // GraphQLSchema,
  // GraphQLID,
  // GraphQLList,
  // GraphQLBoolean,
  // GraphQLInt,
  // GraphQLNonNull,
  // GraphQLDate,
  // GraphQLTime,
  // GraphQLDateTime,
  // GraphQLJSON,
  // GraphQLJSONObject,
} = require('./scalars');

const UserType = require('./user/user.type');

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    user: {
      type: UserType,
    },
  },
});

module.exports = Mutation;
