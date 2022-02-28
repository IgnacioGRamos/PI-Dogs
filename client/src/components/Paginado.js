import React from 'react';
import style from './CSS/paginado.module.css'


export default function Paginado({razasPerPage, allRazas, paginado}) {
    const pageNumbers = [];

    for( var i = 1; i <= Math.ceil(allRazas/razasPerPage); i++) {
        pageNumbers.push(i)
    }


    return (
        <nav className={style.paginado}>
            <ul>
                {pageNumbers && 
                pageNumbers.map(number => (
                    <span key={number}>
                        <button onClick={() => paginado(number)}>{number}</button>
                    </span>
                ))
                }
            </ul>
        </nav>
    )
}