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
const { getUser } = require('../user/user.resolver');
const UserType = require('../user/user.type');

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
});

module.exports = CategoryMapType;
