const { GraphQLSchema } = require('../scalars');

const CompanyQuery = require('./company.query');
const CompanyType = require('./company.type');
const CompanyMutation = require('./company.mutation');

module.exports = new GraphQLSchema({
  types: [CompanyType],
  query: CompanyQuery,
  mutation: CompanyMutation,
});
