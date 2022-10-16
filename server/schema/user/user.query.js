/**
 * @module app.schema.UserQuery
 * @description User Query
 *
 * @requires module:app.schema.scalars
 *
 * @version v1
 * @since 0.1.0
 */

const {
  GraphQLObjectType,
  // GraphQLScalarType,
  // GraphQLUnionType,
  // GraphQLInputObjectType,
  // GraphQLEnumType,
  // GraphQLInterfaceType,
  // GraphQLSchema,
  GraphQLNonNull,
  // GraphQLError,
  GraphQLList,
  GraphQLString,
  GraphQLID,
  // GraphQLBoolean,
  GraphQLInt,
  // GraphQLFloat,
  // GraphQLDate,
  // GraphQLTime,
  // GraphQLDateTime,
  GraphQLJSON,
  // GraphQLJSONObject,
} = require('../scalars');

const {
  getUser,
  getListOfUsers,
  getUserCustomClaims,
  getUserByOldUserName,
  listAllUsers,
  searchUsers,
} = require('./user.resolver');
const { AccountTypeEnumType } = require('./user.enum.types');

const UserType = require('./user.type');

module.exports = new GraphQLObjectType({
  name: 'UserQuery',
  fields: {
    getUserByOldUserName: {
      description: "Retrieves a single user by the user's old username.",
      type: UserType,
      args: {
        oldUserName: {
          description: "The user's old username.",
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: getUserByOldUserName,
    },
    getUserByID: {
      description: "Retrieves a single user by the user's mongo ID.",
      type: UserType,
      args: {
        id: {
          description: "The user's mongo ID.",
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: getUser,
    },
    getUserCustomClaims: {
      description: 'Get user roles',
      type: GraphQLJSON,
      args: {
        email: {
          description: "The user's email id",
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: getUserCustomClaims,
    },
    getUserByEmail: {
      description: "Retrieves a single user by the user's email ID.",
      type: UserType,
      args: {
        email: {
          description: "The user's email ID",
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: getUser,
    },
    getListOfUsers: {
      description: 'Retrieves a list of users.',
      type: new GraphQLList(UserType),
      args: {
        ids: {
          description: 'The list of user mongo IDs',
          type: new GraphQLList(GraphQLID),
        },
        emails: {
          description: 'The list of user email IDs',
          type: new GraphQLList(GraphQLString),
        },
        limit: {
          description: 'The number of results to return',
          type: GraphQLInt,
        },
        offset: {
          description: 'The number of results to skip | The paginatiion point',
          type: GraphQLInt,
        },
      },
      resolve: getListOfUsers,
    },
    searchUsers: {
      description: 'Searches for a user using keywords.',
      type: new GraphQLList(UserType),
      args: {
        searchTerm: {
          description: 'The full search term.',
          type: new GraphQLNonNull(GraphQLString),
        },
        accountType: {
          description: "The user's account type or verification status",
          type: AccountTypeEnumType,
        },
        limit: {
          description: 'The number of results to return',
          type: GraphQLInt,
        },
        offset: {
          description: 'The number of results to skip | The paginatiion point',
          type: GraphQLInt,
        },
      },
      resolve: searchUsers,
    },

    /** Admin APIs */
    listAllUsers: {
      description: 'Retrieves a list of all users.',
      type: new GraphQLList(UserType),
      args: {
        accountType: {
          description: 'Return the list of users by account type',
          type: GraphQLInt,
        },
        limit: {
          description: 'The number of results to return',
          type: GraphQLInt,
        },
        offset: {
          description: 'The number of results to skip | The pagination point',
          type: GraphQLInt,
        },
      },
      resolve: listAllUsers,
    },
  },
});
