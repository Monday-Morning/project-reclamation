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

module.exports = Squiggle();

const PrivacySetting = require('./privacySetting');
const { readPrivacySetting } = require('../resolvers');

const { bucket } = require('../../config/firebase');

function Squiggle() {
    return new GraphQLObjectType({
        name: 'Squiggle',
        fields: () => ({
            id: { type: GraphQLID },
            content: { type: GraphQLString },
            important: { type: GraphQLBoolean }
        })
    })
}