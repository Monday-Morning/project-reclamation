const { GraphQLObjectType, GraphQLNonNull, GraphQLID } = require('../scalars');
const MediaType = require('./media.type');

const { getMediaByID } = require('./media.resolver');

module.exports = new GraphQLObjectType({
  name: 'MediaQuery',
  fields: {
    getMediaByID: {
      description: 'get media by id',
      type: MediaType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: getMediaByID,
    },
  },
});
