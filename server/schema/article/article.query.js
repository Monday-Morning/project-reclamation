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
  // GraphQLBoolean,
  GraphQLInt,
  // GraphQLFloat,
  // GraphQLDate,
  // GraphQLTime,
  // GraphQLDateTime,
  // GraphQLJSON,
  // GraphQLJSONObject,
} = require('../scalars');

const ArticleType = require('./article.type');

module.exports = new GraphQLObjectType({
  name: 'ArticleQuery',
  fields: {
    getArticle: {
      description: 'Retrieves a single article',
      type: ArticleType,
      args: {
        id: {
          description: "The article's mongo ID",
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      // resolve:
    },
    listArticles: {
      description: 'Retrives a list of articles',
      type: new GraphQLList(ArticleType),
      args: {
        ids: {
          description: 'The list of user mongo IDs',
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
      // resolve:
    },
    searchArticles: {
      description: 'Searches for articles using keywords',
      type: new GraphQLList(ArticleType),
      args: {
        keywords: {
          description: 'The search keywords.',
          type: new GraphQLNonNull(GraphQLString),
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
      // resolve:
    },
  },
});
