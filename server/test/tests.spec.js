const expect = require('chai').expect;

describe('Random Integer Check', function () {
  describe('Integer Should Match', function () {
    it('1 is equal to 1', function () {
      expect(1).to.equal(1);
    });
  });

  describe('Integer Should Not Match', function () {
    it('1 is not equal to non-1', function () {
      expect(1).to.not.equal(Math.random() - 1);
    });
  });
});
