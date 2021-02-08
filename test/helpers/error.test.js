/* eslint-disable */
const expect = require('chai').expect;
const { APIError, FirebaseAuthError, GraphQLError } = require('../../server/helpers/errorHandler');

describe('Error Helper Check', () => {
  describe('APIError Check', () => {
    it('Response is of type GraphQLError', () => {
      expect(APIError(null)).to.be.instanceOf(GraphQLError);
    });

    it('Response for INTERNAL_SERVER_ERROR returns expected error', () => {
      let error = APIError('INTERNAL_SERVER_ERROR');
      expect(error).to.be.instanceOf(GraphQLError);
      expect(error.name).to.be.equal('INSERNAL_SERVER_ERROR');
      expect(error.message).to.be.equal("The server has encountered a situation it doesn't know how to handle.");
    });
  });

  describe('FirebaseAuthError', () => {
    it('Response is of type GraphQLError', () => {
      expect(FirebaseAuthError({ code: 'auth/internal-error' })).to.be.instanceOf(GraphQLError);
    });
  });
});
