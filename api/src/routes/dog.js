const express = require('express')
const axios = require('axios')
const { Raza, Temperamento } = require('../db.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = express.Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(express.json());


module.exports = router.post('/', async (req, res) => {
    const {
        nombre,
        altura,
        peso,
        image,
        añosdevida,
        createdInDb,
        temperamento
    } = req.body;

    const razaCreated = await Raza.create({
        nombre,
        altura,
        peso,
        añosdevida,
        image,
        createdInDb
    })

    const temperamentDb = await Temperamento.findAll({ where: { nombre: temperamento }});
    console.log(temperamentDb)
    

    razaCreated.addTemperamento(temperamentDb)
    console.log(razaCreated)
    res.send('Nueva raza creada con exito')
       
});