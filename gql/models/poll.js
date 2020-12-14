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

module.exports = Poll();

const PrivacySetting = require('./privacySetting');
const { readPrivacySetting } = require('../resolvers');

const { bucket } = require('../../config/firebase');

function Poll() {
    return new GraphQLObjectType({
        name: 'Poll',
        fields: () => ({
            id: { type: GraphQLID },
            question: { type: GraphQLString },
            slug: { type: GraphQLString },
            expiry: { type: GraphQLDateTime },
            article: { type: GraphQLObjectType },
            answers: {
                type: GraphQLList(GraphQLString),
                async resolve(parent, args) {
                    //code to be written
                }
            }
        })
    })
}