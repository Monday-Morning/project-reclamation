/**
 * @module app.schema.SquiggleQuery
 * @description Squiggle Query
 *
 * @requires module:app.schema.scalars
 *
 * @version v1
 * @since 0.1.0
 */

const {
  GraphQLObjectType,
  //GraphQLString,
  // GraphQLSchema,
  GraphQLID,
  GraphQLList,
  // GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
  // GraphQLDate,
  // GraphQLTime,
  // GraphQLDateTime,
  // GraphQLJSON,
  // GraphQLJSONObject,
} = require('../scalars');

const SquiggleType = require('./squiggle.type');
const { getSquiggleByID, listSquiggles } = require('./squiggle.resolver');

module.exports = new GraphQLObjectType({
  name: 'SquiggleQuery',
  fields: {
    getLatestSquiggle: {
      description: 'Retrieves the latest squiggle',
      type: SquiggleType,
    },
    getSquiggleByID: {
      description: 'Retrieves a single Squiggle',
      type: SquiggleType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: "The squiggle's mongo ID",
        },
      },
      resolve: getSquiggleByID,
    },
    listSquiggles: {
      description: 'Retrieves a list of all the Squiggles',
      type: new GraphQLNonNull(new GraphQLList(SquiggleType)),
      args: {
        offset: { type: GraphQLInt },
        limit: { type: GraphQLInt },
      },
      resolve: listSquiggles,
    },
  },
});
