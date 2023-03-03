const { APIError } = require('../../utils/exception');
// const UserSession = require('../../utils/userAuth/session');
const LiveModel = require('./live.model');

// const create = async (
//   type,
//   company,
//   recruits,
//   year,
//   semester,
//   studentsRecruited,
//   ctc,
//   benfits,
//   session,
//   authToken,
//   mid
// ) => {
//   try {
//     const _live = await LiveModel.create({
//       type,
//       company,
//       recruits,
//       year,
//       semester,
//       studentsRecruited,
//       ctc,
//       benfits,
//       createdBy: UserSession.valid(session, authToken) ? mid : null,
//     });
//     return _live;
//   } catch (error) {
//     throw APIError(null, error);
//   }
// };

// const update = async (
//   id,
//   type,
//   company,
//   recruits,
//   year,
//   semester,
//   studentsRecruited,
//   ctc,
//   benfits,
//   session,
//   authToken,
//   mid
// ) => {
//   try {
//     const _live = await LiveModel.findByIdAndUpdate(id, {
//       type,
//       company,
//       recruits,
//       year,
//       semester,
//       studentsRecruited,
//       ctc,
//       benfits,
//       updatedBy: UserSession.valid(session, authToken) ? mid : null,
//     });
//     return _live;
//   } catch (error) {
//     throw APIError(null, error);
//   }
// };

const findByYearAndSemester = async (year, semester) => {
  try {
    const _live = await LiveModel.find({ year, semester });
    return _live;
  } catch (error) {
    throw APIError(null, error);
  }
};

// const deleteLiveById = async (id) => {
//   try {
//     await LiveModel.findByIdAndDelete({ _id: id });
//   } catch (error) {
//     throw APIError(null, error);
//   }
// };

const LiveDataSource = () => ({
  // create,
  // update,
  // deleteLiveById,
  findByYearAndSemester,
});

module.exports = LiveDataSource;
