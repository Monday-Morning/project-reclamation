/**
 * @module app.schema.ClubResolver
 * @description Club Resolver
 *
 * @requires module:app.schema.ClubType
 * @requires module:app.schema.ClubModel
 * @requires module:app.authorization

 * @version v1
 * @since 0.1.0
 */

const { GraphQLError, APIError, FirebaseAuthError } = require('../../helpers/errorHandler');
const { Model } = require('mongoose');
const mongoose = require('mongoose');
/**
 * @type {Model}
 */
const { HasPermission } = require('../../helpers/authorization');
const ClubModel = require('./club.model');
const { GraphQLExtension } = require('graphql-extensions');

module.exports = {
  getClub: async (parent, { id }, context, info, _ClubModel = ClubModel) => {
    try {
      if (!id) {
        return APIError('BAD_REQUEST');
      }
      const _club = await _ClubModel.findById(id);

      if (!_club) {
        return APIError('NOT_FOUND');
      }
      return _club;
    } catch (e) {
      if (e instanceof GraphQLError) {
        return e;
      }
      return APIError(null, e);
    }
  },
  addClub: async (
    parent,
    { name, website, instagram, twitter, facebook, description, facAd, society, executive },
    context,
    info,
    _ClubModel = ClubModel
  ) => {
    try {
      if (!name) {
        return APIError('BAD_REQUEST');
      }
      //if (!HasPermission(context, 'club.write.all')) {
      //  return APIError('FORBIDDEN');
      //}

      const _club = await _ClubModel.create({
        name: name,
        website: website,
        instagram: instagram,
        facebook: facebook,
        twitter: twitter,
        // TODO: create an object in the media collection and use ID
        // logo: args.logo,
        description: description,
        society: society,
        facAd: facAd,
        executive: executive,
      });
      return _club;
    } catch (error) {
      if (error instanceof GraphQLError) {
        return error;
      }
      return APIError(null, error);
    }
  },
  listClubs: async (parent, { ids }, context, info, _ClubModel = ClubModel) => {
    try {
      // TODO: if length == 0, APIError doesn.t work
      if (!ids || !(ids instanceof Array || ids.length <= 0)) {
        return APIError('BAD_REQUEST');
      }
      //TODO: set permission and error handling
      // if (!HasPermmission(context, 'club.list.all') || !HasPermmission(context, 'club.read.public')) {
      //   return APIError('FORBIDDEN');
      // }

      const _clubs = await _ClubModel.find().where('_id').in(ids).exec();

      return _clubs;
    } catch (error) {
      if (error instanceof GraphQLError) {
        return error;
      }
      return APIError(null, error);
    }
  },
  searchClubs: async (parent, { keywords }, context, info, _ClubModel = ClubModel) => {
    //TODO: non functional and incomplete as of now
    if (!keywords) {
      return APIError('BAD_REQUEST');
    }

    const _clubs = _ClubModel.find({
      $text: {
        $search: keywords,
        $caseSensitive: true,
      },
    });
    return _clubs;
  },
  updateClub: async (
    parent,
    { id, name, website, executive, instagram, facebook, facAd, description },
    context,
    info,
    _ClubModel = ClubModel
  ) => {
    try {
      if (!id) {
        return APIError('BAD_REQUEST');
      }
      //TODO: Permission handling and error handling needs to be improved.
      //if (!HasPermission(context, 'club.write.all')) {
      //  return APIError('FORBIDDEN');
      //}

      const _clubs = await _ClubModel.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            name: name,
            website: website,
            facebook: facebook,
            instagram: instagram,
            facAd: facAd,
            description: description,
            executive: executive,
          },
        }
      );

      return _clubs;
    } catch (error) {
      if (error instanceof GraphQLError) {
        return error;
      }
      return APIError(null, error);
    }
  },
};
