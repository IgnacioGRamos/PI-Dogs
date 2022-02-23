const express = require('express')
const axios = require('axios')
const { Raza, Temperamento } = require('../db.js')


const router = express.Router();
router.use(express.json());




const getApiInfo = async () => {
    const url = await axios.get("https://api.thedogapi.com/v1/breeds?apikey=8ea16dc8-cee3-4bc3-851b-7872859f6b62");
    const apiInfo = await url.data.map( ob => {
        if( ob.temperament === undefined ) {
            return {
                id: ob.id,
                nombre: ob.name,
                altura: ob.height,
                peso: ob.weight,
                añosdevida: ob.life_span,
                temperamento: 'Unknown',
                image: ob.image.url
            }
        }
        else{
            return {
                id: ob.id,
                nombre: ob.name,
                altura: ob.height,
                peso: ob.weight,
                añosdevida: ob.life_span,
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