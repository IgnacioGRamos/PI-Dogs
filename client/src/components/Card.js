import React from 'react'
import style from './CSS/Card.module.css'


export default function Card({nombre, id, peso, image, temperamento}) {
    return (
        <div className={style.card}>
            <h2 className={style.h2}>{nombre}</h2>

            <h5 className={style.temperamentos}>
                {temperamento.map(el =>
                    <span className={style.temperamento}>
                        <span>{el}</span>
                    </span>
                )}
            </h5>

            <h5 className={style.center}>Peso: {peso} kgs</h5>
            <div className={style.center}>
                <img src={image} alt='Img not found' className={style.img} />
            </div>
            
        </div>
    );
}