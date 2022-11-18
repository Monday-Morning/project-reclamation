const { APIError } = require('../../utils/exception');
const UserPermission = require('../../utils/userAuth/permission');

const DEF_LIMIT = 10;
const DEF_OFFSET = 0;

module.exports = {
  deleteCompanyById: async (_parent, { id }, { session, authToken, decodedToken, API: { Company } }) => {
    try {
      if (!UserPermission.exists(session, authToken, decodedToken, 'live.write.all')) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not have the required permission to perform this operation.',
        });
      }
      const company = await Company.deleteById(id);
      return company;
    } catch (error) {
      throw APIError(null, error);
    }
  },
  getListOfCompanies: async (_parent, { limit = DEF_LIMIT, offset = DEF_OFFSET }, { API: { Company } }) => {
    try {
      const allCompany = await Company.find({}, limit, offset);
      return allCompany;
    } catch (error) {
      throw APIError(null, error);
    }
  },
  getCompanyById: async (_parent, { id }, { API: { Company } }) => {
    try {
      const _company = await Company.findByID.load(id);
      return _company;
    } catch (error) {
      throw APIError(null, error);
    }
  },
  getCompaniesByIds: async (_parent, { ids }, { API: { Company } }) => {
    try {
      const companies = await Company.findByID.load(ids);
      return companies;
    } catch (error) {
      throw APIError(null, error);
    }
  },
  registerCompany: async (
    _parent,
    { name, location, logo },
    { mid, session, authToken, decodedToken, API: { Company } }
  ) => {
    try {
      if (!UserPermission.exists(session, authToken, decodedToken, 'live.write.all')) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not have the required permission to perform this operation.',
        });
      }
      const _company = await Company.create(name, location, logo, session, authToken, mid);
      return _company;
    } catch (error) {
      throw APIError(null, error);
    }
  },
};
