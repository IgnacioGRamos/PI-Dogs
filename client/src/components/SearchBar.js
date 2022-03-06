
import { useState } from 'react'
import {useDispatch} from 'react-redux';
import { getRazasByName } from '../actions';
import style from './CSS/search.module.css'


export default function SearchBar () {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
    };
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getRazasByName(name));
        document.getElementById('input').value = ''; 
    }


    return (
        <div className={style.search}>
            <input type='text' 
            placeholder='Buscar...'
            onChange={(e) => handleInputChange(e) }
            id='input' />
            <button type='submit' onClick={(e) => handleSubmit(e)} >Buscar</button>
        </div>
    )
}