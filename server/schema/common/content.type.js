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
  GraphQLJSONObject,
} = require('../scalars');
const { ContentTypeEnumType, ListStyleEnumType, AlignEnumType } = require('./content.enum.types');

const BlockFormattingType = new GraphQLObjectType({
  name: 'BlockFormatting',
  fields: () => ({
    align: { type: AlignEnumType },
    hasHeaderRow: { type: GraphQLBoolean },
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
    start: { type: GraphQLInt },
    end: { type: GraphQLInt },
  }),
});

const ContentType = new GraphQLObjectType({
  name: 'Content',
  fields: () => ({
    plaintext: { type: new GraphQLNonNull(GraphQLString) },
    data: { type: GraphQLJSONObject },
    mediaID: { type: GraphQLID },
    // TODO: Resolve to MediaType
    /*
    media: {
      type: MediaType,
      resolve: async (parent, args, context, info) => {},
    },
		*/
    contentType: { type: new GraphQLNonNull(ContentTypeEnumType) },
    blockFormatting: { type: BlockFormattingType },
    textFormatting: { type: new GraphQLList(TextFormattingType) },
  }),
});

module.exports = ContentType;
