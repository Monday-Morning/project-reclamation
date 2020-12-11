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

const { UserModel, ArticleModel, TagModel } = require('../models');
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
        }
    },
});

module.exports = Mutation;