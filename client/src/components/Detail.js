import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useParams } from 'react-router-dom';
import Nav from './NavBar';
import style from './CSS/detail.module.css'



export default function Detail(props) {
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch]);

    const myRaza = useSelector((state) => state.detail);


    const url = 'https://st2.depositphotos.com/5486388/8308/v/600/depositphotos_83088988-stock-illustration-dog-face-silhouette.jpg';

    return(
        <div >
            <div className={style.nav}>
               <Nav />
            </div>
            <div className={style.general}>
                {myRaza.length > 0 ? 
                <div className={style.card}>
                    <h1 className={style.center}>{myRaza[0].nombre}</h1>
                    <h2 className={style.center}>{myRaza[0].temperamentos? myRaza[0].temperamentos.map(el => el.nombre + ' ') : myRaza[0].temperamento.split(',').map( el => el) }</h2>
                    <h2 className={style.center}>Altura: {myRaza[0].altura} cm</h2>
                    <h2 className={style.center}>Peso: {myRaza[0].peso} kgs</h2>
                    { myRaza[0].añosdevida && (
                        <h2 className={style.center}>Años de vida: {myRaza[0].añosdevida}</h2>
                    )}
                    <div className={style.center}>
                        <img src={myRaza[0].image? myRaza[0].image : url }  className={style.img}  />
                    </div>
                    

                </div>
                :
                <h1>Raza not found</h1>
                }
            </div>
            <div className={style.volver}>
                <Link to='/home' className={style.button}>Volver</Link>
            </div>
            
        </div>
    )
}