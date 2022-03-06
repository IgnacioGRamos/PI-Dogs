const express = require('express')
const axios = require('axios')
const { Raza, Temperamento } = require('../db.js')


const router = express.Router();
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
                altura: ob.height.metric,
                peso: ob.weight.metric,
                añosdevida: ob.life_span,
                temperamentos: 'Unknown',
                image: ob.image.url
            }
        }
        else{
            return {
                id: ob.id,
                nombre: ob.name,
                altura: ob.height.metric,
                peso: ob.weight.metric,
                añosdevida: ob.life_span,
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
            peso:`${ob.pesoMin} - ${ob.pesoMax}`,
            añosdevida:`${ob.añosdevidaMin} - ${ob.añosdevidaMax} years`,
            image: ob.image,
            createdInDb: ob.createdInDb,
            temperamentos: ob.temperamentos.map( el => el.nombre).join(', ')
        }
    }
    )


    const allInfo = await apiInfo.concat(dbInfo1);
    return allInfo;
}

module.exports = router.get('/:id', async (req, res) => {
    
    const id = req.params.id;

    let allDogs = await getAllRazas();
    
    if(id) {
        let razaId = await allDogs.filter( ob => ob.id == id)
        razaId.length?
        res.status(200).json(razaId) :
        res.status(404).send('No se encontró esa raza')
    }
});