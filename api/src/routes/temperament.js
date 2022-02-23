
const express = require('express')
const axios = require('axios')
const { Temperamento } = require('../db.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = express.Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(express.json());


module.exports = router.get('/', async (req, res) => {
    const url = await axios.get("https://api.thedogapi.com/v1/breeds?apikey=8ea16dc8-cee3-4bc3-851b-7872859f6b62");
    const apiInfo = await url.data.map( ob => {
        if( ob.temperament === undefined ) {
            return ['No tiene temperamento']
        }else{
            return ob.temperament.split(',')
        }
    });

    const setInfoDb = apiInfo.map( arr => {
        for( var i =0; i < arr.length; i++) return arr[i] });

    const infoDb = setInfoDb.filter( el => el !== 'No tiene temperamento')
    infoDb.forEach( el => {Temperamento.findOrCreate({
        where: {
            nombre: el
        }
      })
    });

    var AllTemperaments = await Temperamento.findAll();
    res.status(200).send(AllTemperaments);   
});