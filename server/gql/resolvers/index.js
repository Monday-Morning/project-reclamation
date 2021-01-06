const { readPrivacySetting, updatePrivacySetting } = require('./privacySetting');
const { updateUserById, updateUserByEmail, readUserByEmail, readUserById, deleteUser, createUser } = require('./user');

module.exports = {
  readPrivacySetting,
  updatePrivacySetting,
  updateUserById,
  updateUserByEmail,
  readUserByEmail,
  readUserById,
  deleteUser,
  createUser,
};
