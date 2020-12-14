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

module.exports = Article();

const PrivacySetting = require('./privacySetting');
const { readPrivacySetting } = require('../resolvers');

const { bucket } = require('../../config/firebase');
const User = require('../../mdb/models/user');
const tags = require('./tag');


function Article() {
    return new GraphlQLObjectType({
        name: 'Article',
        fields: () => ({
            id: { type: GraphQLID },
            title: { type: GraphQLString },
            content: {
                type: GraphQLList(GraphQLObjectType),
                async resolve(parent, args) {
                    //code to be written
                }
            },
            excerpt: { type: GraphQLString },
            inshort: { type: GraphQLString },
            slug: { type: GraphQLString },
            author: {
                type: GraphQLList(User),
                async resolve(parent, args) {
                    //code to be written
                }
            },
            category: { type: GraphQLInt },
            tags: {
                type: GraphQLList(tags),
                async resolve(parent, args) {
                    //code to be written
                }
            },
            adminTags: {
                // TODO: Mention the GraphQLList Type after adminTags is created
                type: GraphQLList(),
                async resolve(parent, args) {
                    //code to be written
                }
            },
            coverMedia: { type: GraphQLString },
            status: { type: GraphQLInt },
            featured: { type: GraphQLBoolean },
            restrict: { type: GraphQLBoolean },
            reactionCount: { type: GraphQLObjectType },
            views: { type: GraphQLInt },
            readTime: { type: GraphQLInt },
            timeSpent: { type: GraphQLInt },
            createdAt: { type: GraphQLDateTime },
            updatedAt: { type: GraphQLDateTime }
        })
    });
}