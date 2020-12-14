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

module.exports = Tag();

const PrivacySetting = require('./privacySetting');
const { readPrivacySetting } = require('../resolvers');

const { bucket } = require('../../config/firebase');

function Tag() {
    return new GraphQLObjectType({
        name: 'Tag',
        fields: () => ({
            id: { type: GraphQLID },
            text: { type: GraphQLString },
            admin: { type: GraphQLBoolean },
            createdAt: { type: GraphQLDateTime },
            updatedAt: { type: GraphQLDateTime }
        })
    })
}