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
