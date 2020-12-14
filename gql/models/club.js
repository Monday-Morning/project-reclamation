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

module.exports = Club();

const PrivacySetting = require('./privacySetting');
const { readPrivacySetting } = require('../resolvers');

const { bucket } = require('../../config/firebase');

function Club() {
    return new GraphQLObjectType({
        name: 'Club',
        fields: () => ({
            id: { type: GraphQLID },
            name: { type: GraphQLString },
            website: { type: GraphQLString },
            instagram: { type: GraphQLString },
            facebook: { type: GraphQLString },
            linkedin: { type: GraphQLString },
            twitter: { type: GraphQLString },
            logo: { type: GraphQLString },
            // TODO: executive 
            executive: {
                type: GraphQLList(GraphQLObjectType),
                async resolve(parent, args) {
                    //code to be written
                }
            },
            society: { type: GraphQLString },
            desc: { type: GraphQLString },
            facAf: { type: GraphQLID },
        }),
    })
}