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

const { HasPermission } = require('../../helpers/authorization');
const ClubModel = require('./club.model');

module.exports = {
  getClub: async (parent, args, context, info, _ClubModel = ClubModel, _HasPermission = HasPermission) => {},
  listClubs: async (parent, args, context, info, _ClubModel = ClubModel, _HasPermission = HasPermission) => {},
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
