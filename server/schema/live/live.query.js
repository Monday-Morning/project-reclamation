const { GraphQLObjectType, GraphQLNonNull,GraphQLList, GraphQLString, GraphQLInt } = require('../scalars');
const LiveType = require('./live.type');
const { getLiveByYearandSemester } = require('./live.resolver');

module.exports = new GraphQLObjectType({
  name: 'LiveQuery',
  fields: {
    getLiveByYearandSemester: {
      type: new GraphQLList(LiveType),
      description: 'create live data',
      args: {
        year: { type: new GraphQLNonNull(GraphQLString) },
        semester: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: getLiveByYearandSemester,
    },
  },
});
