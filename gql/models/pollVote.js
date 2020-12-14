const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLDate,
    GraphQLTime,
    GraphQLDateTime,
    GraphQLJSON,
    GraphQLJSONObject,
} = require('../scalars');

module.exports = PollVote();

const PrivacySetting = require('./privacySetting');
const { readPrivacySetting } = require('../resolvers');

const { bucket } = require('../../config/firebase');

function PollVote() {
    return new GraphQLObjectType({
        name: 'PollVote',
        fields: () => ({
            id: { type: GraphQLID },
            user: { type: GraphQLID },
            poll: { type: GraphQLID },
            vote: { type: GraphQLInt }
        })
    })
}