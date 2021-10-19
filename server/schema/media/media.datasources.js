const DataLoader = require('dataloader');
const { APIError } = require('../../utils/exception');
const MediaModel = require('./media.model');

const findByID = () =>
  new DataLoader(
    async (ids) => {
      try {
        const _media = await MediaModel.find({ _id: ids });
        return ids.map((id) => _media.find((_u) => _u.id === id) || null);
      } catch (error) {
        throw APIError(null, error);
      }
    },
    {
      batchScheduleFn: (cb) => setTimeout(cb, 100),
    }
  );

const MediaDataSources = () => ({
  findByID: findByID(),
});

module.exports = MediaDataSources;
