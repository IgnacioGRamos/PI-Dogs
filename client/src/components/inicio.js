import React from 'react';
import { Link } from 'react-router-dom';
import './CSS/Inicio.css'

export default function Inicio() {
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