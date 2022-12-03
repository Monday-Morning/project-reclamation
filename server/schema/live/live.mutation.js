const {
  GraphQLObjectType,
  GraphQLNonNull,
  // GraphQLInputObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
} = require('../scalars');

const LiveType = require('./live.type');
const StudentInfoInput = require('./student/studentinfo.input');

const { addLivedata, deleteLiveData, updateLivedata } = require('./live.resolver');

module.exports = new GraphQLObjectType({
  name: 'LiveMutation',
  fields: {
    addLivedata: {
      type: LiveType,
      description: 'add placement or internship data',
      args: {
        type: { type: new GraphQLNonNull(GraphQLInt) },
        company: { type: new GraphQLNonNull(GraphQLID) },
        recruits: { type: new GraphQLNonNull(GraphQLInt) },
        year: { type: new GraphQLNonNull(GraphQLString) },
        semester: { type: new GraphQLNonNull(GraphQLInt) },
        studentsRecruited: { type: new GraphQLNonNull(new GraphQLList(StudentInfoInput)) },
        ctc: { type: GraphQLString },
        benfits: { type: GraphQLString },
      },
      resolve: addLivedata,
    },
    updateLivedata: {
      type: LiveType,
      description: 'add placement or internship data',
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        type: { type: new GraphQLNonNull(GraphQLInt) },
        company: { type: new GraphQLNonNull(GraphQLID) },
        recruits: { type: new GraphQLNonNull(GraphQLInt) },
        year: { type: new GraphQLNonNull(GraphQLString) },
        semester: { type: new GraphQLNonNull(GraphQLInt) },
        studentsRecruited: { type: new GraphQLNonNull(new GraphQLList(StudentInfoInput)) },
        ctc: { type: GraphQLString },
        benfits: { type: GraphQLString },
      },
      resolve: updateLivedata,
    },

    deleteLiveData: {
      type: LiveType,
      description: 'delete live data by id',
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: deleteLiveData,
    },
  },
});
