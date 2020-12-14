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

module.exports = Placement();

const PrivacySetting = require('./privacySetting');
const { readPrivacySetting } = require('../resolvers');

const { bucket } = require('../../config/firebase');

function Placement() {
    return new GraphQLObjectType({
        name: 'Placement',
        fields: () => ({
            id: { type: GraphQLID },
            type: { type: GraphQLInt },
            company: { type: GraphQLID },
            recruited: {
                type: GraphQLList(GraphQLObjectType),
                async resolve(parent, args) {
                    //code to be written
                }
            },
            ctc: { type: GraphQLInt },
            benefits: { type: GraphQLString },
            date: { type: GraphQLDate }
        })
    })
}