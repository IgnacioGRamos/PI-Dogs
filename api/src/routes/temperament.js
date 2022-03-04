
const express = require('express')
const axios = require('axios')
const { Temperamento } = require('../db.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = express.Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(express.json());

const {
    API_KEY
} = process.env;


module.exports = router.get('/', async (req, res) => {
    const url = await axios.get(`https://api.thedogapi.com/v1/breeds?apikey=${API_KEY}`);
    const apiInfo = await url.data.map( ob => {
        if( ob.temperament === undefined ) {
            return ['No tiene temperamento']
        }else{
            return ob.temperament.split(',')
        }
    });
    // console.log(apiInfo);

    const setInfoDb = apiInfo.map( arr => {
        for( var i =0; i < arr.length; i++) return arr[i] });

        console.log(setInfoDb)

    const infoDb = setInfoDb.filter( el => el !== 'No tiene temperamento')


    const tem = [];
    for( var i = 0; i < infoDb.length; i++) {
        if( !tem.includes(infoDb[i])) {
            tem.push(infoDb[i])
        }
    }

    console.log(tem);
    console.log(tem.length);
    console.log(infoDb.length)


    tem.forEach( el => {Temperamento.findOrCreate({
        where: {
            nombre: el
        }
      })
    });
    
    var AllTemperaments = await Temperamento.findAll();
    console.log(AllTemperaments.length)
    res.status(200).send(AllTemperaments);   
});