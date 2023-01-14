const { GraphQLObjectType, GraphQLNonNull, GraphQLID } = require('../scalars');
const CompanyType = require('./company.type');

const { getCompanyById } = require('./company.resolver');

module.exports = new GraphQLObjectType({
  name: 'CompanyQuery',
  fields: {
    getCompanyById: {
      description: 'Get a company by its mongo ID.',
      type: CompanyType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: getCompanyById,
    },

    // getListOfCompanies: {
    //   description: 'Get list of all companies',
    //   type: new GraphQLList(CompanyType),
    //   args: {
    //     offset: { type: GraphQLInt },
    //     limit: { type: GraphQLInt },
    //   },
    //   resolve: getListOfCompanies,
    // },
    // getCompaniesByIds: {
    //   description: 'Get companies by list of ids',
    //   type: GraphQLList(CompanyType),
    //   args: {
    //     ids: { type: new GraphQLNonNull(GraphQLList(GraphQLID)) },
    //   },
    //   resolve: getCompaniesByIds,
    // },
  },
});
