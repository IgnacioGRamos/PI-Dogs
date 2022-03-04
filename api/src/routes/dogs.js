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
                temperamentos: 'No hay datos sobre el temperamento',
                image: ob.image.url
            }
        }
        else{
            return {
                id: ob.id,
                nombre: ob.name,
                peso: ob.weight.metric,
                temperamentos: ob.temperament,
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
    
    const dbInfo1 = dbInfo.map( ob => {
        return {
            id: ob.id,
            nombre: ob.nombre,
            altura:`${ob.alturaMin} - ${ob.alturaMax}`,
            // alturaMin: ob.alturaMin,
            // alturaMax: ob.alturaMax,
            peso:`${ob.pesoMin} - ${ob.pesoMax}`,
            // pesoMin: ob.pesoMin,
            // pesoMax: ob.pesoMax,
            añosdevida:`${ob.añosdevidaMin} - ${ob.añosdevidaMax} years`,
            // añosdevidaMin: ob.añosdevidaMin,
            // añosdevidaMax: ob.añosdevidaMax,
            image: ob.image,
            createdInDb: ob.createdInDb,
            temperamentos: ob.temperamentos.map( el => el.nombre).join(', ')
        }
    }
    )
    const allInfo = await apiInfo.concat(dbInfo1);
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
