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

/**
 * @type {Model}
 */
const { HasPermission } = require('../../helpers/authorization');
const ClubModel = require('./club.model');
const { GraphQLExtension } = require('graphql-extensions');

module.exports = {
  getClubByID: async (parent, { id }, context, info, _ClubModel = ClubModel) => {
    try {
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
      //if (!HasPermission(context, 'club.write.all')) {
      //  return APIError('FORBIDDEN');
      //}

      const _club = await _ClubModel.create({
        name,
        website,
        instagram,
        facebook,
        twitter,
        // TODO: create an object in the media collection and use ID
        // logo: args.logo,
        description,
        society,
        facAd,
        executive,
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
      if (!(await _ClubModel.exists({ id }))) {
        return APIError('NOT_FOUND');
      }

      /**
       * The getUpdateObject function returns an object that contains the
       * key-value pairs of the club fields that are needed to be updated.
       */
      const getUpdateObject = (propertiesObject) => {
        /**propertiesObject
         * Initialises an empty object that stores the updated fields.
         */
        const updateObject = {};
        /**
         * The propertiesObject(an object which contains the club fields that
         * can be updated) is looped through and only the fields that are
         * required to be updated are added to updateObject.
         */
        for (key in propertiesObject) {
          if (propertiesObject[key]) {
            updateObject[key] = propertiesObject[key];
          }
        }

        return updateObject;
      };

      const updateClub = getUpdateObject({ name, website, executive, instagram, facebook, facAd, description });
      const _club = await _ClubModel.findByIdAndUpdate(id, updateClub);
      return _club;
    } catch (error) {
      if (error instanceof GraphQLError) {
        return error;
      }
      return APIError(null, error);
    }
  },
  deleteClub: async (parent, { id }, context, info, _ClubModel = ClubModel) => {
    try {
      if (!(await _ClubModel.exists({ id }))) {
        return APIError('NOT_FOUND');
      }
      const _club = await _ClubModel.findByIdAndDelete(id);
      return _club;
    } catch (error) {
      if (error instanceof GraphQLError) {
        return error;
      }
      return APIError(null, error);
    }
  },
};
