const DataLoader = require('dataloader');
const CategoryMapModel = require('./categoryMap.model');
const { APIError } = require('../../utils/exception');

const findByID = () =>
  new DataLoader(
    async (ids) => {
      try {
        const _categories = await CategoryMapModel.find({ _id: ids });
        return ids.map((id) => _categories.find((_u) => _u.id === id) || null);
      } catch (error) {
        throw APIError(null, error);
      }
    },
    {
      batchScheduleFn: (cb) => setTimeout(cb, 100),
    }
  );

const findByNumber = () =>
  new DataLoader(
    async (numbers) => {
      try {
        const _categories = await CategoryMapModel.find({ number: numbers });
        for (const _category of _categories) {
          findByID().prime(_category._id, _category);
        }
        return numbers.map((number) => _categories.find((_u) => _u.number === number) || null);
      } catch (error) {
        throw APIError(null, error);
      }
    },
    {
      batchScheduleFn: (cb) => setTimeout(cb, 100),
    }
  );

const CategoryMapDataSources = () => ({
  findByID: findByID(),
  findByNumber: findByNumber(),
});

module.exports = CategoryMapDataSources;
