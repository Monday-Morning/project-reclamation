// const UserPermission = require('../../utils/userAuth/permission');
const { APIError } = require('../../utils/exception');

module.exports = {
  getLiveByYearAndSemester: async (_parent, { year, semester }, { API: { Live } }) => {
    try {
      // TODO: Add permission check

      const _live = await Live.findByYearAndSemester(year, semester);

      if (!_live) {
        throw APIError('NOT_FOUND', null, {
          reason: 'No live data found for the given year and semester.',
        });
      }

      return _live;
    } catch (error) {
      throw APIError(null, error);
    }
  },

  // addLivedata: async (
  //   _parent,
  //   { type, company, recruits, year, semester, studentsRecruited, ctc, benfits },
  //   { mid, session, authToken, decodedToken, API: { Live, Company } }
  // ) => {
  //   try {
  //     if (!UserPermission.exists(session, authToken, decodedToken, 'live.write.all')) {
  //       throw APIError('FORBIDDEN', null, {
  //         reason: 'The user does not have the required permission to perform this operation.',
  //       });
  //     }
  //     const liveData = await Live.create(
  //       type,
  //       company,
  //       recruits,
  //       year,
  //       semester,
  //       studentsRecruited,
  //       ctc,
  //       benfits,
  //       session,
  //       authToken,
  //       mid
  //     );
  //     const _company = await Company.findByID.load(liveData.company);
  //     const _liveData = { ...liveData._doc, company: _company };

  //     return _liveData;
  //   } catch (error) {
  //     throw APIError(null, error);
  //   }
  // },
  // updateLivedata: async (
  //   _parent,
  //   { id, type, company, recruits, year, semester, studentsRecruited, ctc, benfits },
  //   { mid, session, authToken, decodedToken, API: { Live, Company } }
  // ) => {
  //   try {
  //     if (!UserPermission.exists(session, authToken, decodedToken, 'live.write.all')) {
  //       throw APIError('FORBIDDEN', null, {
  //         reason: 'The user does not have the required permission to perform this operation.',
  //       });
  //     }
  //     const liveData = await Live.update(
  //       id,
  //       type,
  //       company,
  //       recruits,
  //       year,
  //       semester,
  //       studentsRecruited,
  //       ctc,
  //       benfits,
  //       session,
  //       authToken,
  //       mid
  //     );
  //     const _company = await Company.findByID.load(liveData.company);

  //     const _liveData = { ...liveData._doc, company: _company };
  //     return _liveData;
  //   } catch (error) {
  //     throw APIError(null, error);
  //   }
  // },
  // deleteLiveData: async (_parent, { id }, { session, authToken, decodedToken, API: { Live } }) => {
  //   try {
  //     if (!UserPermission.exists(session, authToken, decodedToken, 'live.write.all')) {
  //       throw APIError('FORBIDDEN', null, {
  //         reason: 'The user does not have the required permission to perform this operation.',
  //       });
  //     }
  //     const live = await Live.deleteLiveById(id);
  //     return live;
  //   } catch (error) {
  //     throw APIError(null, error);
  //   }
  // },
};
