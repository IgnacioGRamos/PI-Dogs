// const { Router } = require('express');
const express = require('express')
const axios = require('axios')
const { Raza, Temperamento } = require('../db.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = express.Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(express.json());

const {
    API_KEY
} = process.env;


const getApiInfo = async () => {
    const url = await axios.get(`https://api.thedogapi.com/v1/breeds?apikey=${API_KEY}`);
    const apiInfo = await url.data.map( ob => {
        if( ob.temperament === undefined ) {
            return {
                id: ob.id,
                nombre: ob.name,
                peso: ob.weight.metric,
                temperamento: 'No hay datos sobre el temperamento',
                image: ob.image.url
            }
        }
        else{
            return {
                id: ob.id,
                nombre: ob.name,
                peso: ob.weight.metric,
                temperamento: ob.temperament,
                image: ob.image.url
            }
        }
        
    });
    return apiInfo;
};

const getDbInfo = async () => {
    return await Raza.findAll({
        include: {
            model: Temperamento,
            attributes: ['nombre'],
            through: {
                attributes: []
            }
        }
    })
}

const getAllRazas = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const allInfo = await apiInfo.concat(dbInfo);
    return allInfo;
}



module.exports = router.get('/', async (req, res) => {
    
    const name = req.query.name;
    let allDogs = await getAllRazas();
    

    if( name ) {
        let dog = await allDogs.filter( ob => ob.nombre.toLowerCase().includes(name.toLowerCase()));
        dog.length ? 
        res.status(200).send(dog):
        res.status(404).send('No se encontro la Raza')
    }
    else {
        res.status(200).send(allDogs)
    }  
});
