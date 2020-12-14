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

module.exports = Company();

const PrivacySetting = require('./privacySetting');
const { readPrivacySetting } = require('../resolvers');

const { bucket } = require('../../config/firebase');

function Company() {
    return new GraphQLObjectType({
        name: 'Company',
        fields: () => ({
            id: { type: GraphQLID },
            name: { type: GraphQLString },
            alias: { type: GraphQLString },
            location: { type: GraphQLString },
            avatar: { type: GraphQLString },
        })
    })
}