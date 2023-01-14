const { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLInt } = require('../scalars');
const LiveType = require('./live.type');
const { getLiveByYearAndSemester } = require('./live.resolver');
const SemesterEnum = require('../common/session.enum.type');

module.exports = new GraphQLObjectType({
  name: 'LiveQuery',
  fields: {
    getLiveByYearAndSemester: {
      type: new GraphQLList(LiveType),
      description: 'Get all live data for a particular session.',
      args: {
        year: { type: new GraphQLNonNull(GraphQLInt) },
        semester: { type: new GraphQLNonNull(SemesterEnum) },
      },
      resolve: getLiveByYearAndSemester,
    },
  },
});
