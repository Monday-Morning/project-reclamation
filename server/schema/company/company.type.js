const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLDateTime } = require('../scalars');

const ImageType = require('../common/image.type');

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    location: { type: GraphQLString },
    logo: { type: ImageType },

    createdAt: { type: GraphQLDateTime },
    createdBy: { type: GraphQLID },
    updatedAt: { type: GraphQLDateTime },
    updatedBy: { type: GraphQLID },
    schemaVersion: { type: GraphQLInt },
  }),
});

module.exports = CompanyType;
