import React from 'react';


export default function Paginado({razasPerPage, allRazas, paginado}) {
    const pageNumbers = [];

    for( var i = 0; i <= Math.ceil(allRazas/razasPerPage); i++) {
        pageNumbers.push(i + 1)
    }


    return (
        <nav>
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