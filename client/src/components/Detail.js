import React, { useEffect, setTimeout } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getDetail, setDetail } from "../actions";
import { useParams } from 'react-router-dom';
import Nav from './NavBar';
import style from './CSS/detail.module.css'



export default function Detail() {
    const dispatch = useDispatch();
    const myRaza =  useSelector((state) => state.detail);
    const url = 'https://st2.depositphotos.com/5486388/8308/v/600/depositphotos_83088988-stock-illustration-dog-face-silhouette.jpg';
    
    const { id } = useParams();

    useEffect(() => {
        dispatch(getDetail(id))
    }, []);

    useEffect(() => {
        return () => {
            dispatch(setDetail())
        }
    }, []);
    

    return(
        <div >
            <div className={style.nav}>
               <Nav />
            </div>
            <div className={style.general}>

            {myRaza.length > 0 ? 
                <div className={style.card}>
                    <h1 className={style.center}>{myRaza[0].nombre}</h1>
                    {/* <h2 className={style.center}>{myRaza[0].temperamentos.split(',').map( el => el) }</h2> */}

                    <h2 className={style.temperamentos}>
                        {
                           myRaza[0].temperamentos.split(',').map( el =>
                                <span className={style.temperamento}>
                                    <span>{el}</span>
                                </span>) 
                        }
                    </h2>

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
                <h1 className="loader">Loading...</h1>
            }

            </div>
            <div className={style.volver}>
                <Link to='/home' className={style.button}>Volver</Link>
            </div>
            
        </div>
    )
}