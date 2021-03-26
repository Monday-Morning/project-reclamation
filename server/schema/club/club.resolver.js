/**
 * @module app.schema.ClubResolver
 * @description Club Resolver
 *
 * @requires module:app.schema.ClubType
 * @requires module:app.schema.ClubModel
 * @requires module:app.authorization
 *
 * @version v1
 * @since 0.1.0
 */

const { GraphQLError, APIError, FirebaseAuthError } = require('../../helpers/errorHandler');
const { Model } = require('mongoose');
const { HasPermission } = require('../../helpers/authorization');
const ClubModel = require('./club.model');

module.exports = {
  getClub: async (parent, {id}, context, info, _ClubModel = ClubModel, _HasPermission = HasPermission) => {
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
    {name, website, instagram, facebook, description, facAd},
    context,
    info,
    _ClubModel = ClubModel,
  ) => {
    try {
      if(!name){
        return APIError('BAD_REQUEST');
      }
      if(!_HasPermission(context, 'club.write.all')){
        return APIError('FORBIDDEN'); 
      }
      const _club = await _ClubModel.create({
        name: name,
        website: website,
        instagram: instagram,
        facebook: facebook,
        twitter: twitter,
        // TODO: create an object in the media collection and use ID
        // logo: args.logo,
        description: description,
        facAd: facAd,
      });
      return _club;
    } catch (error) {
      if (error instanceof GraphQLError) {
        return error;
      }
      return APIError(null, error);
    }
  },
  listClubs: async (parent, args, context, info, _ClubModel = ClubModel, _HasPermission = HasPermission) => {
    
  },
  searchClubs: async (parent, args, context, info, _ClubModel = ClubModel, _HasPermission = HasPermission) => {},
  updateClub: async (parent, args, context, info, _ClubModel = ClubModel, _HasPermission = HasPermission) => {},
  updateClubExecutive: async (
    parent,
    args,
    context,
    info,
    _ClubModel = ClubModel,
    _HasPermission = HasPermission
  ) => {},
};
