const express = require('express')
const axios = require('axios')
const { Raza, Temperamento } = require('../db.js')


const router = express.Router();
router.use(express.json());


module.exports = router.post('/', async (req, res) => {

    const {
        nombre,
        alturaMin,
        alturaMax,
        pesoMin,
        pesoMax,
        image,
        añosdevidaMin,
        añosdevidaMax,
        createdInDb,
        temperamento
    } = req.body;
    

    const razaCreated = await Raza.create({
        nombre,
        alturaMin,
        alturaMax,
        pesoMin,
        pesoMax,
        añosdevidaMin,
        añosdevidaMax,
        image,
        createdInDb
    })

    const temperamentDb = await Temperamento.findAll({ where: { nombre: temperamento }});
    

    razaCreated.addTemperamento(temperamentDb)
    res.send('Nueva raza creada con exito')
       
});