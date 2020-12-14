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

module.exports = Album();

const PrivacySetting = require('./privacySetting');
const { readPrivacySetting } = require('../resolvers');

const { bucket } = require('../../config/firebase');

function Album() {
    return new GraphQLObjectType({
        name: 'Album',
        fields: () => ({
            id: { type: GraphQLID },
            name: { type: GraphQLString },
            tags: {
                type: GraphQLList(GraphQLObjectType),
                async resolve(parent, args) {
                    //code to be written
                }
            },
            slug: { type: GraphQLString },
            cover: { type: GraphQLID },
            hits: { type: GraphQLInt },
            createdAt: { type: GraphQLDateTime },
            updatedAt: { type: GraphQLDateTime },
        })
    })
}