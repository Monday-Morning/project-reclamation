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

const LiveType = new GraphQLObjectType({
  name: 'Live',
  fields: () => ({
    id: { type: GraphQLID },
    company: { type: CompanyType },
    recruits: { type: GraphQLInt },
    year: { type: GraphQLString },
    semester: { type: GraphQLInt },
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
