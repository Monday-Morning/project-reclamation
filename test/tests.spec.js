const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const expressApp = require('../server/app');
const environmentVars = require('../ecosystem.config');

process.env = {
  ...process.env,
  ...environmentVars.apps[0].env_development,
  NODE_ENV: 'test',
};

chai.use(chaiHttp);

describe('Random Integer Check', function () {
  describe('Integer Should Match', function () {
    it('Running Check', function () {
      expect(1).to.equal(1);
    });
  });

  describe('Integer Should Not Match', function () {
    it('Running Check', function () {
      expect(1).to.not.equal(Math.random());
    });
  });
});

describe('Server Live Check', function () {
  describe('Express Server', function () {
    it('Returns Status 200 & Response Code 404', function () {
      chai
        .request(expressApp)
        .get('/some/random/link')
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body.code).to.equal(404);
        });
    });
  });
  describe('GraphQL Server', function () {});
  describe('MongoDB Connection', function () {});
  describe('Firebase Connecton', function () {});
});
