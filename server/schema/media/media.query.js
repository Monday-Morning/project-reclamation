const { GraphQLObjectType, GraphQLNonNull, GraphQLID } = require('../scalars');
const MediaType = require('./media.type');

const { getMediaByID } = require('./media.resolver');

module.exports = new GraphQLObjectType({
  name: 'MediaQuery',
  fields: {},
});
