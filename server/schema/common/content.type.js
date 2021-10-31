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
  GraphQLBoolean,
  // GraphQLInt,
  // GraphQLFloat,
  // GraphQLDate,
  // GraphQLTime,
  // GraphQLDateTime,
  GraphQLJSON,
  // GraphQLJSONObject,
} = require('../scalars');
const { ContentTypeEnumType, ListStyleEnumType, AlignEnumType } = require('./content.enum.types');

const MediaType = require('../media/media.type');
const { getMediaByID } = require('../media/media.resolver');

const BlockFormattingType = new GraphQLObjectType({
  name: 'BlockFormatting',
  fields: () => ({
    align: { type: AlignEnumType },
    hasHeaderRow: { type: GraphQLBoolean },
    hasHeaderColumn: { type: GraphQLBoolean },
    listStyle: { type: ListStyleEnumType },
  }),
});

const ContentType = new GraphQLObjectType({
  name: 'Content',
  fields: () => ({
    text: { type: GraphQLString },
    data: {
      type: GraphQLJSON,
      resolve: (parent) => (parent.data ? JSON.stringify(parent.data) : undefined),
    },
    mediaID: {
      type: GraphQLID,
      resolve: (parent) => parent.media,
    },
    media: {
      type: MediaType,
      resolve: (parent, _args, context, info) =>
        parent.media ? getMediaByID(null, { id: parent.media }, context, info) : null,
    },
    contentType: { type: ContentTypeEnumType },
    blockFormatting: { type: BlockFormattingType },
  }),
});

module.exports = ContentType;
