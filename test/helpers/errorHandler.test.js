/* eslint-disable */
const expect = require('chai').expect;
const { APIError, FirebaseAuthError, GraphQLError } = require('../../server/helpers/errorHandler');

describe('Error Module', () => {
  describe('APIError Function', () => {
    it('Returns GraphQLError instance', () => {
      expect(APIError(null)).to.be.instanceOf(GraphQLError);
    });

    it('Returns code 500 for INTERNAL_SERVER_ERROR', () => {
      let error = APIError('INTERNAL_SERVER_ERROR', null, { reason: 'Testing' });
      expect(error).to.be.instanceOf(GraphQLError);
      expect(error.name).to.be.equal('GraphQLError');
      expect(error.message).to.be.equal('INTERNAL_SERVER_ERROR');
      expect(error.extensions.code).to.be.equal(500);
      expect(error.extensions.message).to.be.equal(
        "The server has encountered a situation it doesn't know how to handle."
      );
      expect(error.extensions.additional.reason).to.be.equal('Testing');
    });

    it('Return code 403 for FORBIDDEN', () => {
      let error = APIError('FORBIDDEN', null, { reason: 'Testing' });
      expect(error).to.be.instanceOf(GraphQLError);
      expect(error.name).to.be.equal('GraphQLError');
      expect(error.message).to.be.equal('FORBIDDEN');
      expect(error.extensions.code).to.be.equal(403);
      expect(error.extensions.message).to.be.equal(
        "The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401, the client's identity is known to the server."
      );
      expect(error.extensions.additional.reason).to.be.equal('Testing');
    });
  });

  describe('FirebaseAuthError Function', () => {
    it('Returns GraphQLError instance', () => {
      expect(FirebaseAuthError({ code: 'auth/internal-error' })).to.be.instanceOf(GraphQLError);
    });

    it('Returns code 500 for auth/email-already-exist', () => {
      let error = FirebaseAuthError({ code: 'auth/email-already-exists' }, { reason: 'Testing' });
      expect(error).to.be.instanceOf(GraphQLError);
      expect(error.name).to.be.equal('GraphQLError');
      expect(error.message).to.be.equal('auth/email-already-exists');
      expect(error.extensions.code).to.be.equal(500);
      expect(error.extensions.message).to.be.equal(
        'The provided email is already in use by an existing user. Each user must have a unique email.'
      );
      expect(error.extensions.additional.reason).to.be.equal('Testing');
    });

    it('Returns code 500 for auth/invalid-id-token', () => {
      let error = FirebaseAuthError({ code: 'auth/invalid-id-token' }, { reason: 'Testing' });
      expect(error).to.be.instanceOf(GraphQLError);
      expect(error.name).to.be.equal('GraphQLError');
      expect(error.message).to.be.equal('auth/invalid-id-token');
      expect(error.extensions.code).to.be.equal(500);
      expect(error.extensions.message).to.be.equal('The provided ID token is not a valid Firebase ID token.');
      expect(error.extensions.additional.reason).to.be.equal('Testing');
    });
  });
});
