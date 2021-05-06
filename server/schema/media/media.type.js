const UserDetailType = require('../common/userDetail.type');
const {
  GraphQLObjectType,
  // GraphQLScalarType,
  // GraphQLUnionType,
  // GraphQLInputObjectType,
  // GraphQLEnumType,
  // GraphQLInterfaceType,
  // GraphQLSchema,
  // GraphQLNonNull,
  // GraphQLError,
  GraphQLList,
  GraphQLString,
  GraphQLID,
  // GraphQLBoolean,
  GraphQLInt,
  // GraphQLFloat,
  // GraphQLDate,
  // GraphQLTime,
  GraphQLDateTime,
  // GraphQLJSON,
  // GraphQLJSONObject,
} = require('../scalars');
const { getUser } = require('../user/user.resolver');
const UserType = require('../user/user.type');
const MediaEnumType = require('./media.enum.type');

const MediaType = new GraphQLObjectType({
  name: 'Media',
  fields: () => ({
    id: { type: GraphQLID },
    authors: { type: new GraphQLList(UserDetailType) },
    storePath: { type: GraphQLString },
    mediaType: { type: MediaEnumType },
    blurhash: { type: GraphQLString },

    createdAt: { type: GraphQLDateTime },
    createdBy: { type: GraphQLID },
    createdByUser: {
      type: UserType,
      resolve: (parent, _, context, info) => getUser(null, { id: parent.createdBy }, context, info),
    },
    updatedAt: { type: GraphQLDateTime },
    updatedBy: { type: GraphQLID },
    updatedByUser: {
      type: UserType,
      resolve: (parent, _, context, info) => getUser(null, { id: parent.updatedBy }, context, info),
    },
    schemaVersion: { type: GraphQLInt },
  }),
});

module.exports = MediaType;
