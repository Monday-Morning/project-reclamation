const SquiggleModel = require('./squiggle.model');
const { APIError } = require('../../utils/exception');

const getLatest = async () => {
  try {
    const _squiggle = await SquiggleModel.findOne().sort({ _id: 'desc' });
  } catch (error) {
    throw APIError(null, error);
  }
};

const findByID = async (id) => {
  try {
    const _squiggle = await SquiggleModel.findById(id);
    return _squiggle;
  } catch (error) {
    throw APIError(null, error);
  }
};

const find = async (query, limit, offset) => {
  try {
    const _squiggles = await SquiggleModel.find(query).sort({ _id: 'desc' }).skip(offset).limit(limit);
    return _squiggles;
  } catch (error) {
    throw APIError(null, error);
  }
};

const SquiggleDataSources = () => ({
  getLatest,
  findByID,
  find,
});

module.exports = SquiggleDataSources;
