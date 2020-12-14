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

module.exports = Subscriber();

const PrivacySetting = require('./privacySetting');
const { readPrivacySetting } = require('../resolvers');
const { bucket } = require('../../config/firebase');

function Subscriber() {
    return new GraphQLObjectType({
        name: 'Subscriber',
        fields: () => ({
            id: { type: GraphQLID },
            user: { type: GraphQLID },
            token: { type: GraphQLString },
        })
    })
}