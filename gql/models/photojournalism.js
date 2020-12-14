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

module.exports = PhotoJournalism();

const PrivacySetting = require('./privacySetting');
const { readPrivacySetting } = require('../resolvers');

const { bucket } = require('../../config/firebase');

function PhotoJournalism() {
    return new GraphQLObjectType({
        name: 'PhotoJournalism',
        fields: () => ({
            id: { type: GraphQLID },
            title: { type: GraphQLString },
            excerpt: { type: GraphQLString },
            slug: { type: GraphQLString },
            featured: { type: GraphQLString },
            authors: {
                type: GraphQLList(GraphQLObjectType),
                async resolve(parent, args) {
                    //code to be written
                }
            },
            media: {
                type: GraphQLList(GraphQLObjectType),
                async resolve(parent, args) {
                    //code to be written
                }
            },
            tags: {
                type: GraphQLList(GraphQLObjectType),
                async resolve(parent, args) {
                    //code to be written
                }
            },
            adminTags: {
                type: GraphQLList(GraphQLObjectType),
                async resolve(parent, args) {
                    //code to be written
                }
            },
            status: { type: GraphQLBoolean },
            hits: { type: GraphQLInt }
        })
    })
}