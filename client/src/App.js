import React from "react";
import './App.css';
import {BrowserRouter, Route, Routes } from 'react-router-dom';

import Inicio from './components/inicio.js';
import Home from "./components/Home";


function App() {
  return (
    // In V6, you can't use the component prop anymore. It was replaced in favor of element
    // Tampoco se usa mas el Switch, se usa todo con Routes

    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Inicio /> } />
        <Route exact path="/home" element={<Home /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
