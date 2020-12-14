const {
  GraphQLObjectType,
  GraphQLString,
  // GraphQLSchema,
  GraphQLID,
  GraphQLList,
  // GraphQLBoolean,
  // GraphQLInt,
  // GraphQLNonNull,
  // GraphQLDate,
  // GraphQLTime,
  GraphQLDateTime,
  // GraphQLJSON,
  // GraphQLJSONObject,
} = require('../scalars');

module.exports = Issue();

function Issue() {
  return new GraphQLObjectType({
    name: 'issue',
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      slug: { type: GraphQLString },
      publishedAt: { type: GraphQLDateTime },
      articles: {
        type: GraphQLList(GraphQLObjectType),
        async resolve(parent, args) {
          //code to be written
        },
      },
      featuredSlider: {
        type: GraphQLList(GraphQLObjectType),
        async resolve(parent, args) {
          //code to be written
        },
      },
      featuredTop4: {
        type: GraphQLList(GraphQLObjectType),
        async resolve(parent, args) {
          //code to be written
        },
      },
      thumbnail: { type: GraphQLString },
      description: { type: GraphQLString },
    }),
  });
}
