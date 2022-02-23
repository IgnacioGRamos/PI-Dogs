import React from 'react'


export default function Card({nombre, image, temperamento}) {
    return (
        <div>
            <h2>{nombre}</h2>
            <h5>{temperamento}</h5>
            <img src={image} alt='Img not found' width='300px' height='200px' />
        </div>
    );
}