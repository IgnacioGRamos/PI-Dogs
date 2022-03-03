const { Raza, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Raza.sync({ force: true }));
    describe('create raza', () => {
      it('should throw an error if name is null', (done) => {
        Raza.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });

      it('error sin peso', function(done) {
        Raza.create({
          nombre: 'IGNACIO',
          altura: '36 - 43', 
        })
         .then(() => done(new Error('It requires a valid weight')))
         .catch(() => done());
     });
    });

    describe('Peso', function () {
      it('crea la raza con los datos pasados ', function() {
        return Raza.create({
          nombre: 'IGNACIO',
          altura: '36 - 43', 
          peso: '7 - 40'
        })
          .then(raza => {
            expect(raza.peso).to.equal('7 - 40');
          })
      });
    });
  });
});
