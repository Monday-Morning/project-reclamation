const DataLoader = require('dataloader');
const { APIError } = require('../../utils/exception');
const UserSession = require('../../utils/userAuth/session');
const CompanyModel = require('./company.model');

const create = async (name, location, logo, session, authToken, mid) => {
  try {
    const _company = await CompanyModel.create({
      name,
      location,
      logo,
      createdBy: UserSession.valid(session, authToken) ? mid : null,
    });
    return _company;
  } catch (error) {
    throw APIError(error, { reason: "The company can't be registered" });
  }
};

const find = (query, limit, offset) => CompanyModel.find(query).sort({ name: 'asc' }).skip(offset).limit(limit);

const findByID = () =>
  new DataLoader(
    (ids) => {
      try {
        const _company = ids.map((id) => CompanyModel.findById(id));
        return _company;
      } catch (error) {
        throw APIError(null, error);
      }
    },
    {
      batchScheduleFn: (cb) => setTimeout(cb, 100),
    }
  );

const findByIDs = async (ids) => {
  try {
    const _company = await Promise.all(ids.map((id) => findByID(id)));
    return _company;
  } catch (error) {
    throw APIError(null, error);
  }
};

const deleteById = async (id) => {
  try {
    return await CompanyModel.findOneAndDelete({ _id: id });
  } catch (error) {
    throw APIError(error, { reason: "The company can't be deleted" });
  }
};

const CompanyDataSources = () => ({ findByID: findByID(), create, find, findByIDs, deleteById });

module.exports = CompanyDataSources;
