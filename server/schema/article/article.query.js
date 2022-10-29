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
const {
  getArticleByID,
  getListOfArticles,
  getArticlesByCategories,
  searchArticle,
  listArticlesByYearAndMonth,
  listAllArticles,
  countOfArticlesBySubCategory,
  getArticleByOldID,
  countTotalNumberOfArticles,
} = require('./article.resolver');

const ArticleType = require('./article.type');

module.exports = new GraphQLObjectType({
  name: 'ArticleQuery',
  fields: {
    getArticleByID: {
      description: 'Retrieves a single article',
      type: ArticleType,
      args: {
        id: {
          description: "The article's mongo ID",
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: getArticleByID,
    },
    getArticleByOldID: {
      description: 'Find an article from old ID',
      type: ArticleType,
      args: {
        id: {
          description: 'The old ID of the article',
          type: new GraphQLNonNull(GraphQLInt),
        },
      },
      resolve: getArticleByOldID,
    },
    getListOfArticles: {
      description: 'Retrives multiple articles by ID',
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
      resolve: getListOfArticles,
    },
    getArticlesByCategories: {
      description: 'Retrives multiple articles by categories',
      type: new GraphQLList(new GraphQLList(ArticleType)),
      args: {
        categoryNumbers: {
          description: 'The list of category numbers',
          type: new GraphQLNonNull(new GraphQLList(GraphQLInt)),
        },
        onlyPublished: {
          description: 'Whether to only list published articles',
          type: GraphQLBoolean,
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
      resolve: getArticlesByCategories,
    },
    listArticlesByYearAndMonth: {
      description: 'List all article by month and year',
      type: new GraphQLList(ArticleType),
      args: {
        onlyPublished: {
          description: 'Whether to only list published articles',
          type: new GraphQLNonNull(GraphQLBoolean),
        },
        limit: {
          description: 'The number of results to return',
          type: GraphQLInt,
        },
        offset: {
          description: 'The number of results to skip | The paginatiion point',
          type: GraphQLInt,
        },
        year: {
          description: 'The year in which articles published',
          type: GraphQLInt,
        },
        month: {
          description: 'The month in which articles published',
          type: GraphQLInt,
        },
      },
      resolve: listArticlesByYearAndMonth,
    },
    listAllArticles: {
      description: 'Lists all articles in descending order of creation time',
      type: new GraphQLList(ArticleType),
      args: {
        onlyPublished: {
          description: 'Whether to only list published articles',
          type: new GraphQLNonNull(GraphQLBoolean),
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
      resolve: listAllArticles,
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
      resolve: searchArticle,
    },
    countTotalArticles: {
      description: 'Counts the total number of articles',
      type: GraphQLInt,
      args: {
        onlyPublished: {
          description: 'Whether to only list published articles',
          type: GraphQLBoolean,
        },
      },
      resolve: countTotalNumberOfArticles,
    },
    countOfArticlesBySubCategory: {
      description: 'Get total number of articles by Sub Category',
      type: GraphQLInt,
      args: {
        categoryNumber: {
          description: 'The category number',
          type: new GraphQLNonNull(GraphQLInt),
        },
        onlyPublished: {
          description: 'Whether to only list published articles',
          type: GraphQLBoolean,
        },
      },
      resolve: countOfArticlesBySubCategory,
    },
  },
});
