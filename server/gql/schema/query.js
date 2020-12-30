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

const { UserModel } = require('../models');
const { readUserByEmail, readUserById } = require('../resolvers');

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: UserModel,
      args: {
        id: { type: GraphQLID },
        email: { type: GraphQLString },
      },
      async resolve(parent, args) {
        let userRecord;
        if (args !== null && args !== undefined && args.id !== null && args.id !== undefined)
          userRecord = await readUserById(parent, args);
        else if (args !== null && args !== undefined && args.email !== null && args.email !== undefined)
          userRecord = await readUserByEmail(parent, args);
        else {
          return {
            id: 'NoID',
            error: 'No Arguments Passed!',
            isError: true,
            code: 400,
            docsCount: 0,
          };
        }
        return userRecord;
      },
    },
    users: {
      type: GraphQLList(UserModel),
      args: {
        limit: { type: GraphQLInt },
        offset: { type: GraphQLInt },
      },
      async resolve(parent, args) {
        if (agrs === null || args === undefined)
          args = {
            limit: 10,
            offset: 0,
          };
        if (args.limit === null || args.limit === undefined) {
          args.limit = 10;
        }
        if (args.offset === null || args.offset === undefined) {
          args.offset = 10;
        }
        return await readUsers(parent, args);
      },
    },
  },
});

module.exports = Query;
