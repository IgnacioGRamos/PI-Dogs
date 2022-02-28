import React from 'react';
import { Link } from 'react-router-dom';
import style from './CSS/Nav.module.css'

export function Nav() {
  return (
    <nav className={style.nav} >
      <div className={style.link}>
        <Link to='/' className={style.text1}>Dog World</Link>
      </div>
      
      <div className={style.span}>
          <Link to='/home' className={style.text}>Razas</Link>
          <Link to='/create' className={style.text}>Crear Raza</Link>
      </div>
      
    </nav>
  )
};

export default Nav;