const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLDate,
  GraphQLTime,
  GraphQLDateTime,
  GraphQLJSON,
  GraphQLJSONObject,
} = require('../scalars');

const { UserModel } = require('../gql_models');
const { updateUserByEmail, updateUserById, deleteUser } = require('../resolvers');

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    updateUser: {
      type: UserModel,
      args: {
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        fullname: { type: GraphQLString },
        sex: { type: GraphQLString },
      },
      async resolve(parent, args) {
        if (args !== null && args !== undefined && args.id !== null && args.id !== undefined) {
          return await updateUserById(parent, args);
        } else if (args !== null && args !== undefined && args.email !== null && args.email !== undefined) {
          return await updateUserByEmail(parent, args);
        } else {
          return {
            id: 'NoID',
            error: 'No Arguments Passed!',
            isError: true,
            code: 400,
            docsCount: 0,
          };
        }
      },
    },
    deleteUser: {
      type: UserModel,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parents, args) {
        return await deleteUser(parents, args);
      },
    },
  },
});

module.exports = Mutation;
