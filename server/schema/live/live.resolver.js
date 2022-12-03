const UserPermission = require('../../utils/userAuth/permission');
const { APIError } = require('../../utils/exception');

module.exports = {
  addLivedata: async (
    _parent,
    { type, company, recruits, year, semester, studentsRecruited, ctc, benfits },
    { mid, session, authToken, decodedToken, API: { Live, Company } }
  ) => {
    try {
      if (!UserPermission.exists(session, authToken, decodedToken, 'live.write.all')) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not have the required permission to perform this operation.',
        });
      }
      const liveData = await Live.create(
        type,
        company,
        recruits,
        year,
        semester,
        studentsRecruited,
        ctc,
        benfits,
        session,
        authToken,
        mid
      );
      const _company = await Company.findByID.load(liveData.company);
      const _liveData = { ...liveData._doc, company: _company };

      return _liveData;
    } catch (error) {
      throw APIError(null, error);
    }
  },
  updateLivedata: async (
    _parent,
    { id, type, company, recruits, year, semester, studentsRecruited, ctc, benfits },
    { mid, session, authToken, decodedToken, API: { Live, Company } }
  ) => {
    try {
      if (!UserPermission.exists(session, authToken, decodedToken, 'live.write.all')) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not have the required permission to perform this operation.',
        });
      }
      const liveData = await Live.update(
        id,
        type,
        company,
        recruits,
        year,
        semester,
        studentsRecruited,
        ctc,
        benfits,
        session,
        authToken,
        mid
      );
      const _company = await Company.findByID.load(liveData.company);

      const _liveData = { ...liveData._doc, company: _company };
      return _liveData;
    } catch (error) {
      throw APIError(null, error);
    }
  },

  getLiveByYearandSemester: async (
    _parent,
    { year, semester },
    { session, authToken, decodedToken, API: { Live, Company } }
  ) => {
    try {
      if (!UserPermission.exists(session, authToken, decodedToken, 'live.read.all')) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not have the required permission to perform this operation.',
        });
      }
      const liveByYearAndSemester = await Live.findLiveByYearAndSemester(year, semester);
      const _companyIds = liveByYearAndSemester.reduce((prev, curr) => prev.add(curr.company.toString()), new Set());

      const comapnyIds = Array.from(_companyIds);

      const comapnies = await Company.findByIDs(comapnyIds);

      const comapnies_map = new Map(comapnies.map((obj) => [obj.id, obj]));

      const _liveByYearAndSemester = liveByYearAndSemester.map((curr) => ({
        ...curr._doc,
        company: comapnies_map.get(curr.company.toString()),
      }));

      return _liveByYearAndSemester;
    } catch (error) {
      throw APIError(null, error);
    }
  },
  deleteLiveData: async (_parent, { id }, { session, authToken, decodedToken, API: { Live } }) => {
    try {
      if (!UserPermission.exists(session, authToken, decodedToken, 'live.write.all')) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not have the required permission to perform this operation.',
        });
      }
      const live = await Live.deleteLiveById(id);
      return live;
    } catch (error) {
      throw APIError(null, error);
    }
  },
};
