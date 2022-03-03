import React from 'react';
import { Link } from 'react-router-dom';
import './CSS/Inicio.css'

import { useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { getRazas, getTemperaments} from '../actions';

export default function Inicio() {

  const dispatch = useDispatch();


    useEffect(() => {       // esto remplaza al mapdispatchtoprops
      dispatch(getRazas())   
  },[dispatch]);

  useEffect(() => {
      dispatch(getTemperaments())
  }, []);

  return (
    <div className='general'>
      <div className='conteiner' >
        <div className='titulo'>Welcome to Dog World!</div>
        <Link to='/home' className='Sub' >
          <button className='explore' >Explore</button>
        </Link>
      </div>
      
    </div>
  )
};