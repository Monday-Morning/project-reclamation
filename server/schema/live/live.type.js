const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLDateTime,
} = require('../scalars.js');
const CompanyType = require('../company/company.type');
const StudentType = require('./student/student.type');
const SemesterEnum = require('../common/session.enum.type.js');
const { getCompanyById } = require('../company/company.resolver.js');

const LiveType = new GraphQLObjectType({
  name: 'Live',
  fields: () => ({
    id: { type: GraphQLID },
    liveType: {
      type: GraphQLInt,
      resolve: (parent) => parent.type,
    },
    companyID: {
      type: GraphQLID,
      resolve: (parent) => parent.companyID || parent.company,
    },
    company: {
      type: CompanyType,
      resolve: (parent, _args, context, info) =>
        getCompanyById(parent, { id: parent.companyID?.toString() || parent.company?.toString() }, context, info),
    },
    recruits: { type: GraphQLInt },
    year: { type: GraphQLString },
    semester: { type: SemesterEnum },
    studentsRecruited: { type: new GraphQLList(StudentType) },
    ctc: { type: GraphQLString },
    benefits: { type: GraphQLString },

    createdAt: { type: GraphQLDateTime },
    createdBy: { type: GraphQLID },
    updatedAt: { type: GraphQLDateTime },
    updatedBy: { type: GraphQLID },
    schemaVersion: { type: GraphQLInt },
  }),
});

module.exports = LiveType;
