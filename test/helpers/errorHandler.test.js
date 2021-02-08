/* eslint-disable */
const expect = require('chai').expect;
const { APIError, FirebaseAuthError, GraphQLError } = require('../../server/helpers/errorHandler');

describe('Error Helper Check', () => {
  describe('APIError Check', () => {
    it('Response is of type GraphQLError', () => {
      expect(APIError(null)).to.be.instanceOf(GraphQLError);
    });

    it('Response for INTERNAL_SERVER_ERROR returns expected error', () => {
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

    it('Response for FORBIDDEN returns expected error', () => {
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

  describe('FirebaseAuthError', () => {
    it('Response is of type GraphQLError', () => {
      expect(FirebaseAuthError({ code: 'auth/internal-error' })).to.be.instanceOf(GraphQLError);
    });

    it('Response for auth/email-already-exists returns expected error', () => {
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

    it('Response for auth/invalid-id-token returns expected error', () => {
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
