const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is not send', (done) => {
        Videogame.create({ description: 'multiplayer game', platforms: 'PC' })
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should throw an error if description is not send', (done) => {
        Videogame.create({ name: 'Among us', platforms: 'PC' })
          .then(() => done(new Error('It requires a valid description')))
          .catch(() => done());
      });
      it('should throw an error if no platform is send', (done) => {
        Videogame.create({ name: 'Among us', description: 'multiplayer game' })
          .then(() => done(new Error('It requires a valid platform')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Videogame.create({ name: 'Super Mario Bros' });
      });
    });
  });
});
