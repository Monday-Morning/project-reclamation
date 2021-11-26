const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const UserAuth = require('../utils/userAuth');
const UserDataSources = require('../schema/user/user.datasources');
const TagDataSources = require('../schema/tag/tag.datasources');
const SquiggleDataSources = require('../schema/squiggle/squiggle.datasources');
const MediaDataSources = require('../schema/media/media.datasources');
const IssueDataSources = require('../schema/issue/issue.datasources');
const CategoryMapDataSources = require('../schema/categoryMap/categoryMap.datasources');
const ArticleDataSources = require('../schema/article/article.datasources');

const CustomLandingPagePlugin = {
  serverWillStart() {
    return {
      renderLandingPage() {
        const html = `
<html>
<body>
<script>window.location = "${
          !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
            ? process.env.APOLLO_ENDPOINT
            : 'https://mondaymorning.nitrkl.ac.in'
        }";</script>
</body>
</html>
				`;
        return { html };
      },
    };
  },
};

/**
 * @summary Main Apollo Server
 * @description initialize Apollo server with required configration and attach schema
 * @constant apolloServer
 *
 * @type {ApolloServer}
 */
const apolloServer = (httpServer) =>
  new ApolloServer({
    schema: require('../schema'),
    context: async ({ req }) => ({
      ...(await UserAuth.getContext(req)),
      session: req.session,
      API: {
        User: UserDataSources(),
        Tag: TagDataSources(),
        Squiggle: SquiggleDataSources(),
        Media: MediaDataSources(),
        Issue: IssueDataSources(),
        CategoryMap: CategoryMapDataSources(),
        Article: ArticleDataSources(),
      },
    }),
    debug: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
    introspection: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
    apollo: {
      key: process.env.APOLLO_KEY,
      graphRef: process.env.APOLLO_GRAPH_REF,
      graphVariant: process.env.APOLLO_GRAPH_VARIANT,
    },
    stopOnTerminationSignals: false,
    plugins: [CustomLandingPagePlugin, ApolloServerPluginDrainHttpServer({ httpServer })],
  });

module.exports = apolloServer;
