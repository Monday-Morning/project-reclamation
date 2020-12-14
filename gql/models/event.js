const {
  GraphQLObjectType,
  GraphQLString,
  // GraphQLSchema,
  GraphQLID,
  // GraphQLList,
  // GraphQLBoolean,
  GraphQLInt,
  // GraphQLNonNull,
  // GraphQLDate,
  // GraphQLTime,
  GraphQLDateTime,
  // GraphQLJSON,
  // GraphQLJSONObject,
} = require('../scalars');

module.exports = Event();

// const PrivacySetting = require('./privacySetting');
// const { readPrivacySetting } = require('../resolvers');

// const { bucket } = require('../../config/firebase');

function Event() {
  return new GraphQLObjectType({
    name: 'Event',
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      slug: { type: GraphQLString },
      startTS: { type: GraphQLDateTime },
      endTS: { type: GraphQLDateTime },
      host: { type: GraphQLID },
      url: { type: GraphQLString },
      venue: { type: GraphQLString },
      hits: { type: GraphQLInt },
    }),
  });
}
