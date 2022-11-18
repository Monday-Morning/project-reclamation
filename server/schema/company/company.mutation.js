const { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString } = require('../scalars');
const { registerCompany, deleteCompanyById } = require('./company.resolver');
const CompanyType = require('./company.type');

module.exports = new GraphQLObjectType({
  name: 'CompanyMutation',
  fields: {
    registerCompany: {
      type: CompanyType,
      description: 'Register a company',
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        location: { type: new GraphQLNonNull(GraphQLString) },
        logo: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: registerCompany,
    },
    deleteCompanyById: {
      type: CompanyType,
      description: 'delete comapny by company ID',
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: deleteCompanyById,
    },
  },
});
