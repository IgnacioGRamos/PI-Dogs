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
    } else if (!input.alturaMin) {
      errors.alturaMin = 'Altura Mínima  is required';
    }
    else if (!input.alturaMax) {
        errors.alturaMax = 'Altura Máxima  is required';
      }
    else if (!input.pesoMin) {
        errors.pesoMin = 'Peso Mínimo is required';
      }
      else if (!input.pesoMax) {
        errors.pesoMax = 'Peso Máximo is required';
      }
    return errors;
};


export default function CreateRaza() {
    const dispatch = useDispatch();
    // const history = useHistory();
    const temperaments = useSelector((state) => state.temperamentos);
    const [errors, setErrors] = useState({});
    const [temperamentos, setTemperamentos] = useState([]);
    

    const [input, setInput] = useState({
        nombre: '',
        alturaMin: '',
        alturaMax: '',
        pesoMin:'',
        pesoMax:'',
        image:'',
        añosdevidaMin: '',
        añosdevidaMax: '',
        temperamento: []

    })

    useEffect(() => {
        dispatch(getTemperaments())
    }, []);

    useEffect(() => {
        setInput({
             ...input, 
            temperamento: [...temperamentos] 
        })
    }, [temperamentos]);

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
        const name = e.target.value;

        if(!temperamentos.includes(name)) {
            setTemperamentos([
                ...temperamentos, 
                name
            ])
        }
    };



    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postRaza(input))
        alert('Raza creada con exito');
        setInput({
            nombre: '',
            alturaMin: '',
            alturaMax: '',
            pesoMin:'',
            pesoMax:'',
            image:'',
            añosdevidaMin: '',
            añosdevidaMax: '',
            temperamento: []
    
        });
        setTemperamentos([]);
        // history.push('/home')
    }
    function handleDelete(el) {

        setTemperamentos(
            temperamentos.filter( tem => tem !== el)
        )

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
                    <label>Altura Mínima: </label>
                    <input type='text' placeholder="Min" value={input.alturaMin} name ='alturaMin' onChange={(e) => handleChange(e)} />
                    {errors.alturaMin && (
                      <p className={style.danger}>{errors.alturaMin}</p>
                    )}
                </div>
                <div className={style.pad}>
                    <label>Altura Máxima: </label>
                    <input type='text' placeholder="Max" value={input.alturaMax} name ='alturaMax' onChange={(e) => handleChange(e)} />
                    {errors.alturaMax && (
                      <p className={style.danger}>{errors.alturaMax}</p>
                    )}
                </div>
                <div className={style.pad}>
                    <label>Peso Mínimo: </label>
                    <input type='text' placeholder="Min" value={input.pesoMin} name ='pesoMin' onChange={(e) => handleChange(e)} />
                    {errors.pesoMin && (
                    <p className={style.danger}>{errors.pesoMin}</p>
                    )}
                </div>
                <div className={style.pad}>
                    <label>Peso Máxima: </label>
                    <input type='text' placeholder="Min" value={input.pesoMax} name ='pesoMax' onChange={(e) => handleChange(e)} />
                    {errors.pesoMax && (
                    <p className={style.danger}>{errors.pesoMax}</p>
                    )}
                </div>
                <div className={style.pad}>
                    <label>Imagen: </label>
                    <input type='text' placeholder="url" value={input.image} name ='image' onChange={(e) => handleChange(e)} />
                </div>
                <div className={style.pad}>
                    <label>Años de Vida Mínimo: </label>
                    <input type='text' placeholder="Min" value={input.añosdevidaMin} name ='añosdevidaMin' onChange={(e) => handleChange(e)} />
                </div>
                <div className={style.pad}>
                    <label>Años de Vida Máximo: </label>
                    <input type='text' placeholder="Max" value={input.añosdevidaMax} name ='añosdevidaMax' onChange={(e) => handleChange(e)} />
                </div>
                <div className={style.select}>
                    <select onChange={(e) => handleSelect(e)} >
                        {temperaments.map((tem) => (
                            <option value={tem.nombre} id={tem.nombre}>{tem.nombre}</option>
                        ))}
                    </select>
                </div>

                { input.nombre && !errors.nombre && !errors.alturaMin && !errors.alturaMax && !errors.pesoMin && !errors.pesoMax && (
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