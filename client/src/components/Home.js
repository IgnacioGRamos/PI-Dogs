import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getRazas, filterCreated, orderByName, getTemperaments, filterByTemperament } from '../actions';
import { Link } from 'react-router-dom';
import style from './CSS/home.module.css'
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';
import Nav from './NavBar';


export default function Home() {

    const dispatch = useDispatch();
    const allRazas = useSelector((state) => state.razas); // esto es igual que hacer el mapstatetoprops, solo que con hooks
    const temperaments = useSelector((state) => state.temperamentos);
    const [render, setRender] = useState(''); // Estado local que nos setea la info, es decir para que haga la modificacion en el renderizado. Al modificar un estado local el componente vuelve a renderizar 
    const[currentPage, setCurrentPage] = useState(1);
    const[razasPerPage, setRazasPerPage] = useState(8);
    const indexOfLastRaza = currentPage * razasPerPage;
    const indexOfFirstRaza = indexOfLastRaza - razasPerPage;
    const currentRazas = allRazas.slice(indexOfFirstRaza, indexOfLastRaza);

    const url = 'https://st2.depositphotos.com/5486388/8308/v/600/depositphotos_83088988-stock-illustration-dog-face-silhouette.jpg';
 

    

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {       // esto remplaza al mapdispatchtoprops
        dispatch(getRazas())   
    },[dispatch]);

    useEffect(() => {
        dispatch(getTemperaments())
    }, []);

    function handleFilterCreated(e) {
        dispatch(filterCreated(e.target.value))
    }

    function handleOrderName(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setRender(`Ordenado ${e.target.value}`);
    }

    function handleFilterTemperament(e) {
        dispatch(filterByTemperament(e.target.value))
    }

    return (
        <div className={style.general}>
            <div className={style.nav}>
                <Nav />
            </div>

            <div className={style.search}>
                <SearchBar />
            </div>


            <div className={style.filter}>
                <div>
                    <label>Ordenar:</label>
                    <select onChange={e => handleOrderName(e)}>
                        <optgroup label="alfabético" />
                        <option value='A-Z'>A-Z</option>
                        <option value='Z-A'>Z-A</option>
                        <optgroup label="Peso" />
                        <option value='ascendente'>Ascendente</option>
                        <option value='descendente'>Descendente</option>
                    </select>
                </div>
                
                <div>
                    <label>Filtrar por Origen:</label>
                    <select onChange={e => handleFilterCreated(e)} >
                        <option value='all'>Todos</option>
                        <option value='created'>Creados</option>
                        <option value='api'>Existentes</option>
                    </select>
                </div>
            
                <div>
                    <label>Filtrar por Temperamento:</label>
                    <select onChange={e => handleFilterTemperament(e)}>
                        {temperaments.map((tem) => (
                            <option value={tem.nombre} key={tem.id} >{tem.nombre}</option>
                        ))}
                    </select>
                </div>
            </div>
            

            <div className={style.cards} >
                {currentRazas?.map((el) => {
                    if(el.createdInDb) {
                       return ( 
                                <Link to={`/home/${el.id}`} className={style.link}>   
                                    <Card nombre={el.nombre} id={el.id} peso={el.peso} image={el.image ? el.image : url} temperamento={el.temperamentos.map(el => el.nombre)} key={el.id} />
                                </Link>
                        )

                    } else {
                        return ( 
                            <Link to={`/home/${el.id}`} className={style.link}> 
                                <Card nombre={el.nombre} id={el.id} peso={el.peso} image={el.image ? el.image : url} temperamento={el.temperamento.split(',')} key={el.id} />
                            </Link >
                        )
                    }
                })
                }
            </div>


            <div >
            <Paginado 
            razasPerPage={razasPerPage}
            allRazas={allRazas.length}
            paginado={paginado}
            />
            </div>
            
        </div>
    )
}

