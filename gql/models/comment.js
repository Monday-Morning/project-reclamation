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

module.exports = Comment();

const PrivacySetting = require('./privacySetting');
const { readPrivacySetting } = require('../resolvers');

const { bucket } = require('../../config/firebase');

function Comment() {
    return new GraphQLObjectType({
        name: 'Comment',
        fields: () => ({
            id: { type: GraphQLID },
            user: { type: GraphQLID },
            content: { type: GraphQLObjectType },
            approved: { type: GraphQLBoolean },
            modelRef: { type: GraphQLID },
            onModel: { type: GraphQLID }
        })
    })
}