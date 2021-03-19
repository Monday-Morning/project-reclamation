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

const UserModelMock = {
  someUser: {
    id: 'some-user',
    firstName: 'John',
    lastName: 'Doe',
    picture: 'some-pic-id',
    accountType: 0,
    contributions: null,
  },
  someAuthor: {
    id: 'some-author',
    firstName: 'Jane',
    lastName: 'Doe',
    picture: 'some-author-pic-id',
    accountType: 2,
    contributions: [
      { model: 'Article', reference: 'some-article-id' },
      { model: 'Media', reference: 'some-media-id' },
    ],
  },
  find: (params, fields, options) => {
    if (params.id === 'some-user') {
      return UserModelMock.someUser;
    } else if (params.id === 'some-author') {
      return UserModelMock.someAuthor;
    } else {
      return null;
    }
  },
};

describe('User Resolver Module', async () => {
  describe('getUser Function', async () => {
    // case: does not have permission to read
    it('Returns FORBIDDEN error if the user does not have permission to read', async () => {
      const _response = await getUser(
        null,
        { id: 'some-user' },
        {},
        { fieldNodes: ['id', 'firstName', 'lastName', 'picture'] },
        UserModelMock
      );

      expect(_response.name).to.be.equal('GraphQLError');
      expect(_response.message).to.be.equal('FORBIDDEN');
    });

    // case: does not have permission for particular field -> use info.fieldNodes
    // only name and pic is public for accTyp 0
    it('Returns FORBIDDEN error if the user does not have permission to read a particular field', async () => {
      const _response = await getUser(
        null,
        { id: 'some-user' },
        { decodedToken: { customClaims: { roles: ['user.basic'] } } },
        { fieldNodes: ['id', 'firstName', 'lastName', 'picture', 'contributions'] },
        UserModelMock
      );

      expect(_response.name).to.be.equal('GraphQLError');
      expect(_response.message).to.be.equal('FORBIDDEN');
    });

    // case: user does not exist
    it('Returns NOT FOUND error if the user does not exist', async () => {
      const _response = await getUser(
        null,
        { id: 'some-non-existant-id' },
        { decodedToken: { customClaims: { roles: ['user.basic'] } } },
        { fieldNodes: ['id', 'firstName', 'lastName', 'picture'] },
        UserModelMock
      );

      expect(_response.name).to.be.equal('GraphQLError');
      expect(_response.message).to.be.equal('NOT_FOUND');
    });

    // case: all works
    it('Returns User object if successful with user.read.public permission', async () => {
      const _response = await getUser(
        null,
        { id: 'some-user' },
        { decodedToken: { customClaims: { roles: ['user.basic'] } } },
        { fieldNodes: ['id', 'firstName', 'lastName', 'picture'] },
        UserModelMock
      );

      let expectedData = UserModelMock.someUser;
      delete expectedData.contributions;

      expect(_response).to.deep.equal(expectedData);
    });

    it('Returns User object if successful with user.read.private permission', async () => {
      const _response = await getUser(
        null,
        { id: 'some-user' },
        { decodedToken: { customClaims: { roles: ['user.verified'] } } },
        { fieldNodes: ['id', 'firstName', 'lastName', 'picture', 'contributions'] },
        UserModelMock
      );

      expect(_response).to.deep.equal(UserModelMock.someUser);
    });

    it('Returns User object if account type is > 0', async () => {
      const _response = await getUser(
        null,
        { id: 'some-author' },
        {},
        { fieldNodes: ['id', 'firstName', 'lastName', 'picture', 'contributions'] },
        UserModelMock
      );

      expect(_response).to.deep.equal(UserModelMock.someAuthor);
    });
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
