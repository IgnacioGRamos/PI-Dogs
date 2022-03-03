import React, { Suspense } from "react";
import './App.css';
import {BrowserRouter, Route, Routes } from 'react-router-dom';

// import Inicio from './components/inicio.js';
// import Home from "./components/Home";
// import CreateRaza from "./components/Create";
// import Detail from "./components/Detail";
const Inicio = React.lazy(() => import('./components/inicio.js'));
const Home = React.lazy(() => import('./components/Home.js'));
const CreateRaza = React.lazy(() => import('./components/Create.js'));
const Detail = React.lazy(() => import('./components/Detail.js'));



function App() {
  return (
    // In V6, you can't use the component prop anymore. It was replaced in favor of element
    // Tampoco se usa mas el Switch, se usa todo con Routes

    <BrowserRouter>
      <Suspense fallback={<div>Cargando....</div>}
      fallbackMinDurationMs = { 4000 }>
        <Routes>
          <Route exact path="/" element={<Inicio /> } />
          <Route path="/home" element={<Home /> } />
          <Route path="/create" element={<CreateRaza /> } />
          <Route path="/home/:id" element={<Detail /> } />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
