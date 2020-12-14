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

const { UserModel, ArticleModel, TagModel, ClubModel, EventModel, PlacementModel, RoleModel, PhotoJournalismModel, SquiggleModel, AlbumModel, SubscriberModel, CommentModel, InternshipModel, HolidayModel, PollModel, ReactionModel } = require('../models');
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
        updateSquiggle: {
            type: SquiggleModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            async resolve(parents, args) {
                return await updateSquiggle(parents, args);
            }
        },
        deleteSquiggle: {
            type: SquiggleModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            async resolve(parents, args) {
                return await deleteSquiggle(parents, args);
            }
        },
        updateAlbum: {
            type: AlbumModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            async resolve(parents, args) {
                return await updateAlbum(parents, args);
            }
        },
        deleteAlbum: {
            type: AlbumModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            async resolve(parents, args) {
                return await deleteAlbum(parents, args);
            }
        },
        // Mutation for forum to be decided
        updateSubscriber: {
            type: SubscriberModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            async resolve(parents, args) {
                return await updateSubscriber(parents, args);
            }
        },
        deleteSubscriber: {
            type: SubscriberModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            async resolve(parents, args) {
                return await deleteSubscriber(parents, args);
            }
        },
        updateComment: {
            type: CommentModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            async resolve(parents, args) {
                return await updateComment(parents, args);
            }
        },
        deleteComment: {
            type: CommentModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            async resolve(parents, args) {
                return await deleteComment(parents, args);
            }
        },
        updateInternship: {
            type: InternshipModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            async resolve(parents, args) {
                return await updateInternship(parents, args);
            }
        },
        deleteInternship: {
            type: InternshipModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            async resolve(parents, args) {
                return await deleteInternship(parents, args);
            }
        },
        updateHoliday: {
            type: HolidayModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            async resolve(parents, args) {
                return await updateHoliday(parents, args);
            }
        },
        deleteHoliday: {
            type: HolidayModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            async resolve(parents, args) {
                return await deleteHoliday(parents, args);
            }
        },
        updatePoll: {
            type: PollModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            async resolve(parents, args) {
                return await updatePoll(parents, args);
            }
        },
        deletePoll: {
            type: PollModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            async resolve(parents, args) {
                return await deletePoll(parents, args);
            }
        },
        updateReaction: {
            type: ReactionModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            async resolve(parents, args) {
                return await updateReaction(parents, args);
            }
        },
        deleteReaction: {
            type: ReactionModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            async resolve(parents, args) {
                return await deleteReaction(parents, args);
            }
        },
    },
});

module.exports = Mutation;