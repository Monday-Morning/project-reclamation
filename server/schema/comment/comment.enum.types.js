const {
  // GraphQLObjectType,
  // GraphQLScalarType,
  // GraphQLUnionType,
  // GraphQLInputObjectType,
  GraphQLEnumType,
  // GraphQLInterfaceType,
  // GraphQLSchema,
  // GraphQLNonNull,
  // GraphQLError,
  // GraphQLList,
  // GraphQLString,
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

const CommentParentModelEmum = new GraphQLEnumType({
  name: 'CommentParentModelEnum',
  values: {
    ARTICLE: { value: 'Article' },
    COMMENT: { value: 'Comment' },
  },
});

module.exports = {
  CommentParentModelEmum,
};
