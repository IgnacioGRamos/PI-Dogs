import React, {useState, useEffect} from "react";
import { Link, useHistory} from 'react-router-dom';
import { postRaza, getTemperaments } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import Nav from './NavBar';
import style from './CSS/create.module.css'



function validate(input) {
    let errors = {};
    if (!input.nombre) {
      errors.nombre = 'Nombre is required';
    } else if (!input.altura) {
      errors.altura = 'Altura is required';
    }
    else if (!input.peso) {
        errors.peso = 'Peso is required';
      }
    return errors;
};


export default function CreateRaza() {
    const dispatch = useDispatch();
    // const history = useHistory();
    const temperaments = useSelector((state) => state.temperamentos);
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        nombre: '',
        altura: '',
        peso:'',
        image:'',
        añosdevida: '',
        temperamento: []

    })

    useEffect(() => {
        dispatch(getTemperaments())
    }, []);

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })

        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
          }));
    }
    
    function handleSelect(e){
        setInput({
            ...input,
            temperamento: [...input.temperamento, e.target.value]
        })
    };
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postRaza(input))
        alert('Raza creada con exito');
        setInput({
            nombre: '',
            altura: '',
            peso:'',
            image:'',
            añosdevida: '',
            temperamento: []
    
        });
        // history.push('/home')
    }
    function handleDelete(el) {
        setInput({
            ...input,
            temperamento: input.temperamento.filter( tem => tem !== el)
        })
    }

    return (
        <div>
            <div className={style.nav}>
                <Nav />
            </div>
            
            <div className={style.general}>
                <div className={style.card}>
                <div className={style.center}>
                    <h1 >Creá tu Raza</h1>
                </div>


            <div className={style.center}>
            <form onSubmit={(e) => handleSubmit(e)} >
                <div className={style.pad}>
                    <label>Nombre: </label>
                    <input type='text' placeholder="Nombre" value={input.nombre} name='nombre' onChange={(e) => handleChange(e)} />
                    {errors.nombre && (
                      <p className={style.danger}>{errors.nombre}</p>
                    )}
                </div>
                <div className={style.pad}>
                    <label>Altura: </label>
                    <input type='text' placeholder="Min - Max" value={input.altura} name ='altura' onChange={(e) => handleChange(e)} />
                    {errors.altura && (
                      <p className={style.danger}>{errors.altura}</p>
                    )}
                </div>
                <div className={style.pad}>
                    <label>Peso: </label>
                    <input type='text' placeholder="Min - Max" value={input.peso} name ='peso' onChange={(e) => handleChange(e)} />
                    {errors.peso && (
                    <p className={style.danger}>{errors.peso}</p>
                    )}
                </div>
                <div className={style.pad}>
                    <label>Imagen: </label>
                    <input type='text' placeholder="url" value={input.image} name ='image' onChange={(e) => handleChange(e)} />
                </div>
                <div className={style.pad}>
                    <label>Años de Vida: </label>
                    <input type='text' placeholder="Min - Max" value={input.añosdevida} name ='añosdevida' onChange={(e) => handleChange(e)} />
                </div>
                <div className={style.select}>
                    <select onChange={(e) => handleSelect(e)} >
                        {temperaments.map((tem) => (
                            <option value={tem.nombre} >{tem.nombre}</option>
                        ))}
                    </select>
                </div>

                { input.nombre && !errors.nombre && !errors.altura && !errors.peso && (
                    <div className={style.select}>
                        <button type='submit' >Crear Raza</button>
                    </div>
                )}
                

                
                
            </form>
            </div>
            
                <div className={style.tem}>
                    <div className={style.tem}>Temperamentos:</div>
                    <div className={style.cards}>
                        {input.temperamento.map(el =>
                                <span className={style.temperamento}>
                                    <span>{el}</span>
                                    <button type="click" onClick={() => handleDelete(el) } className={style.button}>X</button>
                                </span>
                        )}
                    </div>
                        
                </div>
                
                </div>
                
            </div>
            
                
        </div>
    )

}