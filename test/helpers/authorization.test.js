/* eslint-disable */
const expect = require('chai').expect;
const { AuthenticateUser, CheckSession, StartSession, EndSession } = require('../../server/helpers/authorization');
const { GraphQLError } = require('../../server/helpers/errorHandler');
const httpsErrorCodes = require('../../server/helpers/httpErrorCodes');
const firebaseAuthErrorCodes = require('../../server/helpers/firebaseAuthErrorCodes');

const authMock = {
  expiredToken: {
    jwt:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZX0.iKM6vSy5uZ5Vaa4royyeuJaQJN6FVVNNBzGBFyIAWDM',
    name: 'John Doe',
    uid: 'some-random-uid',
    customClaims: {
      mid: 'some-random-mid',
      roles: [],
    },
    exp: 1516239022,
    email_verified: true,
  },
  validToken: {
    jwt:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyMCwiZW1haWxfdmVyaWZpZWQiOnRydWV9.9KQSvqG4L2OSAK3GCLvsTOC9YZHupb1Vhh5JcqvQY8o',
    name: 'John Doe',
    uid: 'some-random-uid',
    customClaims: {
      mid: 'some-random-mid',
      roles: [],
    },
    exp: 15162390220,
    email_verified: true,
  },
  unverfiedToken: {
    jwt:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyMCwiZW1haWxfdmVyaWZpZWQiOmZhbHNlfQ._bSfc-1bFqOdw_g6nxDSlwo_ae1ro3L8CrfZ5dPV2qI',
    name: 'John Doe',
    uid: 'some-random-uid',
    customClaims: {
      mid: 'some-random-mid',
      roles: [],
    },
    exp: 15162390220,
    email_verified: false,
  },
  verifyIdToken: async (jwt, flag) => {
    if (jwt === authMock.expiredToken.jwt) {
      throw { code: 'auth/id-token-expired' };
    } else if (jwt === authMock.validToken.jwt) {
      return authMock.validToken;
    } else if (jwt === authMock.unverfiedToken.jwt) {
      return authMock.unverfiedToken;
    } else {
      throw { code: 'auth/invalid-id-token' };
    }
  },
};

const session = {
  save: () => true,
  destroy: () => true,
  jwt:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyMCwiZW1haWxfdmVyaWZpZWQiOnRydWV9.9KQSvqG4L2OSAK3GCLvsTOC9YZHupb1Vhh5JcqvQY8o',
  name: 'John Doe',
  uid: 'some-random-uid',

  mid: 'some-random-mid',
  roles: [],
  exp: 15162390220,
  email_verified: true,
};

describe('Authorization Module', async () => {
  describe('AuthenticateUser Function', async () => {
    it('Returns decoded token for valid case', async () => {
      let decodedToken = await AuthenticateUser(authMock.validToken.jwt, authMock);
      expect(decodedToken).to.be.instanceOf(Object);
      expect(decodedToken.name).to.be.equal(authMock.validToken.name);
      expect(decodedToken.exp).to.be.equal(authMock.validToken.exp);
      expect(decodedToken.email_verified).to.be.equal(authMock.validToken.email_verified);
    });

    it('Returns UNAUTHORIZED error for expired case', async () => {
      let decodedToken = await AuthenticateUser(authMock.expiredToken.jwt, authMock);
      expect(decodedToken).to.be.instanceOf(GraphQLError);
      expect(decodedToken.name).to.be.equal('GraphQLError');
      expect(decodedToken.message).to.be.equal('auth/id-token-expired');
    });

    it('Returns UNAUTHORIZED error for unverified case', async () => {
      let decodedToken = await AuthenticateUser(authMock.unverfiedToken.jwt, authMock);
      expect(decodedToken).to.be.instanceOf(GraphQLError);
      expect(decodedToken.name).to.be.equal('GraphQLError');
      expect(decodedToken.message).to.be.equal('UNAUTHORIZED');
      expect(decodedToken.extensions.additional.message).to.be.equal('The users email id is not verified.');
    });

    it('Returns UNAUTHORIZED error for invalid case', async () => {
      let decodedToken = await AuthenticateUser('invalid_token', authMock);
      expect(decodedToken).to.be.instanceOf(GraphQLError);
      expect(decodedToken.name).to.be.equal('GraphQLError');
      expect(decodedToken.message).to.be.equal('auth/invalid-id-token');
    });
  });

  describe('CheckSession Function', async () => {
    it('Returns false for no session', () => {
      expect(CheckSession(null, null)).to.be.false;
    });

    it('Returns false for empty session', () => {
      expect(CheckSession({}, null)).to.be.false;
    });

    it('Returns false for mismatched token', () => {
      expect(
        CheckSession(
          {
            auth: {
              jwt: authMock.validToken.jwt,
              exp: authMock.validToken.exp,
              roles: [],
            },
          },
          authMock.unverfiedToken.jwt
        )
      ).to.be.false;
    });

    it('Returns false for expired token', () => {
      expect(
        CheckSession(
          {
            auth: {
              jwt: authMock.expiredToken.jwt,
              exp: authMock.expiredToken.exp,
              roles: [],
            },
          },
          authMock.expiredToken.jwt
        )
      ).to.be.false;
    });

    it('Returns true for valid token', () => {
      expect(
        CheckSession(
          {
            auth: {
              jwt: authMock.validToken.jwt,
              exp: authMock.validToken.exp,
              roles: [],
            },
          },
          authMock.validToken.jwt
        )
      ).to.be.true;
    });
  });

  describe('StartSession Function', async () => {
    it('Returns auth/id-token-expired error when user cannot be authenticated', async () => {
      let decodedToken = await StartSession(session, authMock.expiredToken.jwt, authMock);
      expect(decodedToken).to.be.instanceOf(GraphQLError);
      expect(decodedToken.name).to.be.equal('GraphQLError');
      expect(decodedToken.message).to.be.equal('auth/id-token-expired');
    });

    it('Returns decodedToken when session is created', async () => {
      let decodedToken = await StartSession(session, authMock.validToken.jwt, authMock);
      expect(decodedToken.uid).to.be.equal(authMock.validToken.uid);
      expect(decodedToken.exp).to.be.equal(authMock.validToken.exp);
      expect(decodedToken.customClaims.mid).to.be.equal(authMock.validToken.customClaims.mid);
      expect(decodedToken.customClaims.roles).to.be.equal(authMock.validToken.customClaims.roles);
    });

    it('Returns GraphQLError instance when error is caught', async () => {
      let decodedToken = await StartSession(null, true, true);
      expect(decodedToken).to.be.instanceOf(GraphQLError);
    });
  });

  describe('EndSession Function', async () => {
    it('Returns false if session does not exist', async () => {
      expect(await EndSession(session, authMock.expiredToken.jwt)).to.be.false;
    });

    it('Returns true if session does exist', async () => {
      expect(await EndSession(session, authMock.validToken.jwt)).to.be.true;
    });

    it('Returns GraphQLError instance for rest', async () => {
      let invalidSession = {
        ...session,
        destroy: () => {
          throw 'error';
        },
      };
      expect(await EndSession(invalidSession, authMock.validToken.jwt)).to.be.instanceOf(GraphQLError);
    });
  });
});
