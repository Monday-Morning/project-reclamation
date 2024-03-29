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
  GraphQLBoolean,
  GraphQLInt,
  // GraphQLFloat,
  // GraphQLDate,
  // GraphQLTime,
  // GraphQLDateTime,
  // GraphQLJSON,
  // GraphQLJSONObject,
} = require('../scalars');
const { getTagByID, getListOfTags, getTagAutocomplete } = require('./tag.resolver');
const TagType = require('./tag.type');

module.exports = new GraphQLObjectType({
  name: 'TagQuery',
  fields: {
    getTagByID: {
      description: 'Retrieves a single tag',
      type: TagType,
      args: {
        id: {
          description: "The tag's mongo ID",
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: getTagByID,
    },
    getListOfTags: {
      description: 'Retrieves a list of tags',
      type: new GraphQLList(TagType),
      args: {
        ids: {
          description: 'The list of tag mongo IDs',
          type: new GraphQLNonNull(new GraphQLList(GraphQLID)),
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
      resolve: getListOfTags,
    },

    /** Admin APIs */
    getTagAutocomplete: {
      description: 'Retrieves an autocomplete list of tags',
      type: new GraphQLList(TagType),
      args: {
        searchTerm: {
          description: 'The search term for autocomplete',
          type: new GraphQLNonNull(GraphQLString),
        },
        isAdmin: {
          description: 'Flag for admin tags',
          type: new GraphQLNonNull(GraphQLBoolean),
        },
        limit: {
          description: 'The number of results to return',
          type: GraphQLInt,
        },
      },
      resolve: getTagAutocomplete,
    },
  },
});
