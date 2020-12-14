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

const { UserModel, ArticleModel, TagModel, ClubModel, EventModel, PlacementModel, RoleModel } = require('../models');
const { readUserByEmail, readUserById } = require('../resolvers');
const article = require('../models/article');

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        user: {
            type: UserModel,
            args: {
                id: { type: GraphQLID },
                email: { type: GraphQLString },
            },
            async resolve(parent, args) {
                let userRecord;
                if (args !== null && args !== undefined && args.id !== null && args.id !== undefined)
                    userRecord = await readUserById(parent, args);
                else if (args !== null && args !== undefined && args.email !== null && args.email !== undefined)
                    userRecord = await readUserByEmail(parent, args);
                else {
                    return {
                        id: 'NoID',
                        error: 'No Arguments Passed!',
                        isError: true,
                        code: 400,
                        docsCount: 0,
                    };
                }
                return userRecord;
            },
        },
        users: {
            type: GraphQLList(UserModel),
            args: {
                limit: { type: GraphQLInt },
                offset: { type: GraphQLInt },
            },
            async resolve(parent, args) {
                if (!args.limit) {
                    args.limit = 10;
                }
                if (!args.offset) {
                    args.offset = 10;
                }
                return await readUsers(parent, args);
            },
        },
        article: {
            type: ArticleModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            async resolve(parents, args) {
                //code to be written
            }
        },
        articles: {
            type: GraphQLList(ArticleModel),
            args: {
                // TODO: arguments to be decided
                offset: { type: GraphQLInt },
                category: { type: GraphQLInt },

            },
            async resolve(parent, args) {
                //code to be written
            }
        },
        tag: {
            type: TagModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            async resolve(parents, args) {
                //code to be written
            }
        },
        tags: {
            type: GraphQLList(TagModel),
            args: {
                // to be decided
            },
            async resolve(parents, args) {
                //code to be written
            }
        },
        club: {
            type: ClubModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            async resolve(parents, args) {
                //code to be written
            },
        },
        clubs: {
            type: GraphQLList(ClubModel),
            args: {
                // To be decided
            },
            async resolve(parents, args) {
                //code to be written
            }
        },
        event: {
            type: EventModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            async resolve(parents, args) {
                //code to be written
            }
        },
        events: {
            type: GraphQLList(EventModel),
            args: {
                // To be decided
            },
            async resolve(parents, args) {
                //code to be written
            }
        },
        placement: {
            type: PlacementModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            async resolve(parents, args) {
                //code to be written
            }
        },
        placements: {
            type: GraphQLList(PlacementModel),
            args: {
                // To be decided
            },
            async resolve(parents, args) {
                //code to be written
            }
        },
        role: {
            type: RoleModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            async resolve(parents, args) {
                //code to be written
            }
        },
        roles: {
            type: GraphQLList(RoleModel),
            args: {
                // To be decided
            },
            async resolve(parents, args) {
                //code to be written
            }
        },

    },
});
//code to be written
module.exports = Query;