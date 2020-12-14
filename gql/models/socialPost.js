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
            url: { type: GraphQLString },
            caption: { type: GraphQLString },
            media: {
                type: GraphQLList(GraphQLObjectType),
                async resolve(parent, args) {
                    //code to be written
                }
            },
            hashtags: {
                type: GraphQLList(GraphQLObjectType),
                async resolve(parent, args) {
                    //code to be written
                }
            },
            urls: {
                type: GraphQLList(GraphQLObjectType),
                async resolve(parent, args) {
                    //code to be written
                }
            },
            source: { type: GraphQLInt },
            visible: { type: GraphQLBoolean }
        })
    })
}