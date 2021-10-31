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
  // GraphQLList,
  GraphQLString,
  // GraphQLID,
  // GraphQLBoolean,
  // GraphQLInt,
  // GraphQLFloat,
  // GraphQLDate,
  // GraphQLTime,
  // GraphQLDateTime,
  // GraphQLJSON,
  // GraphQLJSONObject,
} = require('../scalars');
const StoreEnumType = require('./store.enum.type');

const ImageType = new GraphQLObjectType({
  name: 'Image',
  fields: () => ({
    store: { type: StoreEnumType },
    storePath: { type: GraphQLString },
    blurhash: { type: GraphQLString },
  }),
});

module.exports = ImageType;
