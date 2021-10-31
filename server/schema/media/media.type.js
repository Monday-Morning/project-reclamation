const StoreEnumType = require('../common/store.enum.type');
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
const MediaEnumType = require('./media.enum.type');

const MediaType = new GraphQLObjectType({
  name: 'Media',
  fields: () => ({
    id: { type: GraphQLID },
    authors: { type: new GraphQLList(UserDetailType) },
    store: { type: StoreEnumType },
    storePath: { type: GraphQLString },
    mediaType: { type: MediaEnumType },
    blurhash: { type: GraphQLString },

    createdAt: { type: GraphQLDateTime },
    createdBy: { type: GraphQLID },
    updatedAt: { type: GraphQLDateTime },
    updatedBy: { type: GraphQLID },
    schemaVersion: { type: GraphQLInt },
  }),
});

module.exports = MediaType;
