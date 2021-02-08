/* eslint-disable */
const expect = require('chai').expect;
const { AuthenticateUser } = require('../../server/helpers/authorization');
const { GraphQLError } = require('../../server/helpers/errorHandler');

const authMock = {
  expiredToken: {
    jwt:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZX0.iKM6vSy5uZ5Vaa4royyeuJaQJN6FVVNNBzGBFyIAWDM',
    name: 'John Doe',
    exp: 1516239022,
    email_verified: true,
  },
  validToken: {
    jwt:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyMCwiZW1haWxfdmVyaWZpZWQiOnRydWV9.9KQSvqG4L2OSAK3GCLvsTOC9YZHupb1Vhh5JcqvQY8o',
    name: 'John Doe',
    exp: 15162390220,
    email_verified: true,
  },
  unverfiedToken: {
    jwt:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyMCwiZW1haWxfdmVyaWZpZWQiOmZhbHNlfQ._bSfc-1bFqOdw_g6nxDSlwo_ae1ro3L8CrfZ5dPV2qI',
    name: 'John Doe',
    exp: 15162390220,
    email_verified: false,
  },
  verifyIdToken: async (jwt, flag) => {
    if (jwt === authMock.expiredToken.jwt) {
      return authMock.expiredToken;
    } else if (jwt === authMock.validToken.jwt) {
      return authMock.validToken;
    } else if (jwt === authMock.unverfiedToken.jwt) {
      return authMock.unverfiedToken;
    } else {
      throw { code: 'auth/invalid-id-token' };
    }
  },
};

describe('Authorization Handler Check', () => {
  describe('AuthenticateUser Function', () => {
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
      expect(decodedToken.message).to.be.equal('UNAUTHORIZED');
      expect(decodedToken.extensions.code).to.be.equal(401);
      expect(decodedToken.extensions.message).to.be.equal(
        'This request is unauthorized. Your request may be missing a valid authorization token.'
      );
      expect(decodedToken.extensions.additional.message).to.be.equal('The users JWT token has expired');
    });

    it('Returns UNAUTHORIZED error for unverified case', async () => {
      let decodedToken = await AuthenticateUser(authMock.unverfiedToken.jwt, authMock);
      expect(decodedToken).to.be.instanceOf(GraphQLError);
      expect(decodedToken.name).to.be.equal('GraphQLError');
      expect(decodedToken.message).to.be.equal('UNAUTHORIZED');
      expect(decodedToken.extensions.code).to.be.equal(401);
      expect(decodedToken.extensions.message).to.be.equal(
        'This request is unauthorized. Your request may be missing a valid authorization token.'
      );
      expect(decodedToken.extensions.additional.message).to.be.equal('The users email id is not verified.');
    });

    it('Returns UNAUTHORIZED error for invalid case', async () => {
      let decodedToken = await AuthenticateUser('invalid_token', authMock);
      expect(decodedToken).to.be.instanceOf(GraphQLError);
      expect(decodedToken.name).to.be.equal('GraphQLError');
      expect(decodedToken.message).to.be.equal('auth/invalid-id-token');
      expect(decodedToken.extensions.code).to.be.equal(500);
      expect(decodedToken.extensions.message).to.be.equal('The provided ID token is not a valid Firebase ID token.');
    });
  });
});
