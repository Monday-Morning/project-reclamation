/* eslint-disable */
const expect = require('chai').expect;
const { APIError, FirebaseAuthError, GraphQLError } = require('../../helpers/errorHandler');

describe('Error Helper Check', () => {
  describe('APIError Check', () => {
    it('Response is of type GraphQLError', () => {
      expect(APIError('OK')).to.be.instanceOf(GraphQLError);
    });
  });

  describe('FirebaseAuthError', () => {
    it('Response is of type GraphQLError', () => {
      expect(FirebaseAuthError({ code: 'auth/internal-error' })).to.be.instanceOf(GraphQLError);
    });
  });
});
