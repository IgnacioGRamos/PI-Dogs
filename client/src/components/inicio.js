import React from 'react';
import { Link } from 'react-router-dom';

export default function Inicio() {
  return (
    <div>
      <h1>Henry Dogs</h1>
      <Link to='/home'>
        <button>Explore</button>
      </Link>
    </div>
  )
};