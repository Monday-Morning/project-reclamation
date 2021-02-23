const expect = require('chai').expect;
const {
  getUser,
  listUsers,
  searchUsers,
  createUser,
  updateUserName,
  updateUserPicture,
  updateUserTopics,
  updateUserBio,
  addNITRMail,
  verifyNITRMail,
  newsletterSubscription,
  setUserVerfiedStatus,
  setUserBan,
} = require('../../server/schema/user/user.resolver');

describe('User Resolver Check', () => {
  describe('getUser Function', () => {
    // case: does not have permission to read
    // case: does not have permission for particular field -> use info.fieldNodes
    // only name and pic is public for accTyp 0
    // case: user does not exist
    // case: all works
  });

  describe('listUsers Function', () => {
    // case: does not have permission to list - only MM
    // case: does not have permission for particular field -> use info.fieldNodes
    // case: empty set
    // case: all works
  });

  describe('searchUsers Function', () => {
    // case: does not have permission to search - only show accType > 0
    // case: does not have permission for particular field -> use info.fieldNodes
    // case: empty set
    // case: all works
  });

  describe('createUser Function', () => {
    // case: user does not exist in firebase
    // case: user already exists in database
    // case: all works
  });

  describe('updateUserName Function', () => {
    // case: does not have permission to change (not self)
    // case: user does not exist
    // case: cannot change any more (changed once or nitr verified)
    // case: propagation failed
    // case: all works
  });

  describe('updateUserPicture Function', () => {
    // case: does not have permission to change (not self)
    // case: user does not exist
    // case: image not found on cloudinary
    // case: propagation failed
    // case: all works
  });

  describe('updateUserTopics Function', () => {
    // case: does not have permission to change (not self)
    // case: user does not exist
    // case: all works
  });

  describe('updateUserBio Function', () => {
    // case: does not have permission to change (not self)
    // case: user does not exist
    // case: all works
  });

  describe('addNITRMail Function', () => {
    // case: does not have permission to change (not self)
    // case: already has nitr mail registered
    // case: invalid mail
    // case: all works
  });

  describe('verifyNITRMail Function', () => {
    // case: invalid user id
    // case: invalid token
    // case: incorrect email id
    // case: all works
  });

  describe('newsletterSubscription Function', () => {
    // case: does not have permission to change (not self)
    // case: all works
  });

  describe('setUserVerfiedStatus Function', () => {
    // case: does not have permission to change (not admin)
    // case: set to 0 - should delete nitr mail and position (if any)
    // case: set to 1 - should add nitr mail
    // case: set to 2 - should add nitr mail and position
    // case: set to 3 - should add nitr mail
    // case: all works
  });

  describe('setUserBan Function', () => {
    // case: does not have permission to change (not admin)
    // case: all works
  });
});
