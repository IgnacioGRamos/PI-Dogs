import React from 'react'
import {Link} from 'react-router-dom'
import style from './CSS/Card.module.css'


export default function Card({nombre, id, peso, image, temperamento}) {
    return (
        <div className={style.card}>
            <h2 className={style.h2}>{nombre}</h2>
            <h5 className={style.center}>Peso: {peso} kgs</h5>
            <h5 className={style.temperamento}>{temperamento}</h5>
            <div className={style.center}>
                <img src={image} alt='Img not found' className={style.img} />
            </div>
            
        </div>
    );
}