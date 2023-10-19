const SquiggleModel = require('./squiggle.model');
const { APIError } = require('../../utils/exception');

const getLatest = async () => {
  try {
    const _squiggle = await SquiggleModel.findOne().sort({ _id: 'desc' });
    return _squiggle;
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

const create = async (squiggleType, content) => {
  try {
    const _squiggle = await SquiggleModel.create({
      squiggleType,
      content,
    });

    return _squiggle;
  } catch (error) {
    throw APIError(null, error);
  }
};

const updateContent = async (id, newContent) => {
  try {
    const _squiggle = await SquiggleModel.findById(id);

    _squiggle.content = newContent || _squiggle.content;

    await _squiggle.save();

    return _squiggle;
  } catch (error) {
    throw APIError(null, error);
  }
};

const SquiggleDataSources = () => ({
  getLatest,
  findByID,
  find,
  create,
  updateContent
});

module.exports = SquiggleDataSources;
