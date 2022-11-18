const { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLID, GraphQLString, GraphQLInt } = require('../scalars');
const MediaType = require('./media.type');

const { addMedia, deleteMediaById } = require('./media.resolver');

module.exports = new GraphQLObjectType({
  name: 'MediaMutation',
  fields: {
    addMedia: {
      type: MediaType,
      description: 'add media by uploading image',
      args: {
        imageKitFileID: { type: new GraphQLNonNull(GraphQLID) },
        authors: { type: new GraphQLNonNull(GraphQLList(GraphQLID)) },
        store: { type: GraphQLInt },
        storePath: { type: new GraphQLNonNull(GraphQLString) },
        mediaType: { type: GraphQLInt },
        blurhash: { type: GraphQLString },
      },
      resolve: addMedia,
    },
    deleteMediaById: {
      type: MediaType,
      description: 'delete media by id',
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        imageKitFileID: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: deleteMediaById,
    },
  },
});
