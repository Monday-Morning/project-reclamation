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
  GraphQLBoolean,
  GraphQLInt,
  // GraphQLFloat,
  // GraphQLDate,
  // GraphQLTime,
  // GraphQLDateTime,
  GraphQLJSON,
  // GraphQLJSONObject,
} = require('../scalars');
const { ContentTypeEnumType, ListStyleEnumType, AlignEnumType } = require('./content.enum.types');

const MediaType = require('../media/media.type');
const { getMedia } = require('../media/media.resolver');

const BlockFormattingType = new GraphQLObjectType({
  name: 'BlockFormatting',
  fields: () => ({
    align: { type: AlignEnumType },
    hasHeaderRow: { type: GraphQLBoolean },
    hasHeaderColumn: { type: GraphQLBoolean },
    listStyle: { type: ListStyleEnumType },
  }),
});

const TextFormattingType = new GraphQLObjectType({
  name: 'TextFormatting',
  fields: () => ({
    bold: { type: GraphQLBoolean },
    italic: { type: GraphQLBoolean },
    underline: { type: GraphQLBoolean },
    strikethrough: { type: GraphQLBoolean },
    size: { type: GraphQLInt },
    elementIndex: { type: GraphQLString },
    start: { type: GraphQLInt },
    end: { type: GraphQLInt },
  }),
});

const LinkType = new GraphQLObjectType({
  name: 'Link',
  fields: () => ({
    href: { type: GraphQLString },
    start: { type: GraphQLInt },
    end: { type: GraphQLInt },
  }),
});

const ContentType = new GraphQLObjectType({
  name: 'Content',
  fields: () => ({
    plaintext: { type: GraphQLString },
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
      resolve: (parent) => (parent.media ? getMedia(null, { id: parent.media }) : null),
    },
    contentType: { type: ContentTypeEnumType },
    blockFormatting: { type: BlockFormattingType },
    textFormatting: { type: new GraphQLList(TextFormattingType) },
    links: { type: new GraphQLList(LinkType) },
  }),
});

module.exports = ContentType;
