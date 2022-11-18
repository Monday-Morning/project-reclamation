const { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLInt, GraphQLID } = require('../scalars');
const CompanyType = require('./company.type');

const { getListOfCompanies, getCompanyById, getCompaniesByIds } = require('./company.resolver');

module.exports = new GraphQLObjectType({
  name: 'CompanyQuery',
  fields: {
    getListOfCompanies: {
      description: 'Get list of all companies',
      type: new GraphQLList(CompanyType),
      args: {
        offset: { type: GraphQLInt },
        limit: { type: GraphQLInt },
      },
      resolve: getListOfCompanies,
    },
    getCompanyById: {
      description: 'Get company by id',
      type: CompanyType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: getCompanyById,
    },
    getCompaniesByIds: {
      description: 'Get companies by list of ids',
      type: GraphQLList(CompanyType),
      args: {
        ids: { type: new GraphQLNonNull(GraphQLList(GraphQLID)) },
      },
      resolve: getCompaniesByIds,
    },
  },
});
