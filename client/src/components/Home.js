import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getRazas, filterCreated, orderByName } from '../actions';
import {Link} from 'react-router-dom'
import Card from './Card';
import Paginado from './Paginado';

export default function Home() {

    const dispatch = useDispatch();
    const allRazas = useSelector((state) => state.razas); // esto es igual que hacer el mapstatetoprops, solo que con hooks
    const [orden, setOrden] = useState(''); // Estado local que nos setea la info, es decir para que haga la modificacion en el renderizado. Al modificar un estado local el componente vuelve a renderizar 
    const[currentPage, setCurrentPage] = useState(1);
    const[razasPerPage, setRazasPerPage] = useState(8);
    const indexOfLastRaza = currentPage * razasPerPage;
    const indexOfFirstRaza = indexOfLastRaza - razasPerPage;
    const currentRazas = allRazas.slice(indexOfFirstRaza, indexOfLastRaza);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {       // esto remplaza al mapdispatchtoprops
        dispatch(getRazas())   
    },[dispatch]);

    function handleFilterCreated(e) {
        dispatch(filterCreated(e.target.value))
    }

    function handleOrderName(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }

    return (
        <div>
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
            
            <select onChange={e => handleFilterCreated(e)} >
                <option value='all'>Todos</option>
                <option value='created'>Creados</option>
                <option value='api'>Existentes</option>
                
            </select>
            <Paginado 
            razasPerPage={razasPerPage}
            allRazas={allRazas.length}
            paginado={paginado}
            />

            {currentRazas?.map((el) => {
                return ( 
                    <div> 
                        <Link to={'/home/' + el.id}>
                          <Card nombre={el.nombre} image={el.image} temperamento={el.temperamento} key={el.id} />
                        </Link>
                    </div>
                )
            })

            }

        </div>
    )
}