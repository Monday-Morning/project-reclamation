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
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  // GraphQLInt,
  // GraphQLFloat,
  // GraphQLDate,
  // GraphQLTime,
  // GraphQLDateTime,
  // GraphQLJSON,
  // GraphQLJSONObject,
} = require('../scalars');
const { createTag, updateTag } = require('./tag.resolver');
const TagType = require('./tag.type');

module.exports = new GraphQLObjectType({
  name: 'TagMutation',
  fields: {
    createTag: {
      description: 'Create a new tag',
      type: TagType,
      args: {
        name: {
          description: 'The name of the tag',
          type: new GraphQLNonNull(GraphQLString),
        },
        isAdmin: {
          description: 'Whether the tag is an admin tag',
          type: GraphQLBoolean,
        },
        adminColor: {
          description: 'The color of the tag (if admin)',
          type: GraphQLString,
        },
      },
      resolve: createTag,
    },
    updateTag: {
      description: 'Update an existing tag',
      type: TagType,
      args: {
        id: {
          description: 'The Mongo ID of the tag',
          type: new GraphQLNonNull(GraphQLID),
        },
        name: {
          description: 'The updated name of the tag',
          type: GraphQLString,
        },
        isAdmin: {
          description: 'The updated admin flag of the tag',
          type: GraphQLBoolean,
        },
        adminColor: {
          description: 'The updated admin color of the tag',
          type: GraphQLString,
        },
      },
      resolve: updateTag,
    },
  },
});
