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

const CategoryMapType = new GraphQLObjectType({
  name: 'CategoryMap',
  fields: () => ({
    id: { type: GraphQLID },
    number: { type: GraphQLInt },
    name: { type: GraphQLString },
    parent: {
      type: new GraphQLObjectType({
        name: 'ParentCategoryMap',
        fields: () => ({
          number: { type: GraphQLInt },
          referenceID: { type: CategoryMapType },
        }),
      }),
    },
  }),

  createdAt: { type: GraphQLDateTime },
  createdBy: { type: GraphQLID },
  updatedAt: { type: GraphQLDateTime },
  updatedBy: { type: GraphQLID },
  schemaVersion: { type: GraphQLInt },
});

module.exports = CategoryMapType;
