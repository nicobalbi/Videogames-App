/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
  name: 'Super Mario Bros',
  description: 'Players control Mario, or his brother Luigi in the multiplayer mode, as they traverse the Mushroom Kingdom to rescue Princess Toadstool from King Koopa (later named Bowser).',
  platforms: 'Nintendo 64, Game Cube'
};

describe('Videogame routes', () => {

  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));

  beforeEach(() => conn.sync({ force: true })
    .then(() => Videogame.create(videogame)));

  describe('GET /videogames', () => {
    
    it('should reply the GET method with status code 200', async () => {
      const res = await agent.get('/videogames');
      expect(res.statusCode).to.equal(200);
    }).timeout(20000);
    
    it('should reply the GET method with an array of videogames greater than or equal to 100', async () => {
      const res = await agent.get('/videogames');
      expect(res.body.length).to.be.greaterThanOrEqual(100);
    }).timeout(20000);
  
  });

  describe('POST /videogames', () => {
    
    it('should reply the POST method with status code 400 if required data not send', async () => {
      const res = await agent.post('/videogames').send({});
      expect(res.statusCode).to.be.equal(400);
    });

    it('should reply the POST method with status code 200 if required data is send', async () => {
      const res = await agent.post('/videogames').send({ 
        name: 'Among us', 
        description: 'multiplayer game',
        genres: ['Strategy', 'Simulation'], 
        platforms: 'PC' 
      });
      expect(res.statusCode).to.be.equal(200);
    });
  
  });

});
