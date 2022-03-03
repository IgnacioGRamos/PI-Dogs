/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Raza, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  nombre: 'Ignacio',
  altura: '36 - 43',
  peso: '14 - 68'
};

describe('Razas routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Raza.sync({ force: true })
    .then(() => Raza.create(dog)));
  describe('GET /dogs', () => {

    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );

    it("GET responde con todas las razas", function () {
      return agent // supertest nos permite hacer y testear requests HTTP
        .get("/dogs") // hacemos un request HTTP: GET a '/houses'
        .expect(200) // el codigo de status del response
        .expect("Content-Type", /json/) // podemos testear los headers
        .expect(function (res) {
          expect(res.body.length > 0); // testeamos la respuesta con el body
        });
    });


    it("Pasamos un nombre que no exite por query y obtenemos un error", function () {
      
      return agent
        .get("/dogs?name=Nada")
        .expect(404)
        .expect("Content-Type", /text/)
        .expect(function (res) {
          expect(res.body).to.eql({});
        });
    });


    it("Pasamos un nombre por query y obtenemos esa raza", function () {
      
      return agent
        .get("/dogs?name=Akita")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          expect(res.body).to.eql([{
            id: 6,
            nombre: 'Akita',
            peso: "29 - 52",
            temperamento: "Docile, Alert, Responsive, Dignified, Composed, Friendly, Receptive, Faithful, Courageous",
            image: "https://cdn2.thedogapi.com/images/BFRYBufpm.jpg"}]);
        });
    });
  });
});
