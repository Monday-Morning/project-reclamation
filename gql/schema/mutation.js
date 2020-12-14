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

const { UserModel, ArticleModel, TagModel, ClubModel, EventModel, PlacementModel, RoleModel, PhotoJournalismModel } = require('../models');
const { updateUserByEmail, updateUserById, deleteUser } = require('../resolvers');

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        updateUser: {
            type: UserModel,
            args: {
                id: { type: GraphQLID },
                email: { type: GraphQLString },
                fullname: { type: GraphQLString },
                sex: { type: GraphQLString },
            },
            async resolve(parent, args) {
                if (args !== null && args !== undefined && args.id !== null && args.id !== undefined) {
                    return await updateUserById(parent, args);
                } else if (args !== null && args !== undefined && args.email !== null && args.email !== undefined) {
                    return await updateUserByEmail(parent, args);
                } else {
                    return {
                        id: 'NoID',
                        error: 'No Arguments Passed!',
                        isError: true,
                        code: 400,
                        docsCount: 0,
                    };
                }
            },
        },
        deleteUser: {
            type: UserModel,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
            },
            async resolve(parents, args) {
                return await deleteUser(parents, args);
            },
        },
        updateArticle: {
            type: ArticleModel,
            args: {
                // TODO: arguments to be decided
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parents, args) {
                // code to be written
            },
        },
        deleteArticle: {
            type: ArticleModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            async resolve(parents, args) {
                return await deleteArticle(parents, args);
            }
        },
        updateTag: {
            type: TagModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                // TODO: arguments to be decided
            }
        },
        deleteTag: {
            type: TagModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            async resolve(parents, args) {
                return await deleteTag(parents, args);
            }
        },
        updateClub: {
            type: ClubModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            async resolve(parents, args) {
                return await updateClub(parents, args);
            }
        },
        deleteClub: {
            type: ClubModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            async resolve(parents, args) {
                return await deleteClub(parents, args);
            }
        },
        updateEvent: {
            type: EventModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            async resolve(parents, args) {
                return await updateEvent(parents, args);
            }
        },
        deleteEvent: {
            type: EventModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            async resolve(parents, args) {
                return await deleteEvent(parents, args);
            }
        },
        updatePlacement: {
            type: PlacementModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            async resolve(parents, args) {
                return await updatePlacement(parents, args);
            }
        },
        deletePlacement: {
            type: PlacementModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            async resolve(parents, args) {
                return await deletePlacement(parents, args);
            }
        },
        updateRole: {
            type: RoleModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            async resolve(parents, args) {
                return await updateRole(parents, args);
            }
        },
        deleteRole: {
            type: RoleModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            async resolve(parents, args) {
                return await deleteRole(parents, args);
            }
        },
        updatePhotoJournalism: {
            type: PhotoJournalismModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            async resolve(parents, args) {
                return await updatePhotoJournalism(parents, args);
            }
        },
        deletePhotoJournalism: {
            type: PhotoJournalismModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            async resolve(parents, args) {
                return await deletePhotoJournalism(parents, args);
            }
        },
    },
});

module.exports = Mutation;