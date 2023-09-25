'use strict'

import axios from "axios";
import React, { useState } from "react"
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


export const InsertTiendaSAC = ()=>{

    //Se setean los datos
    const [form, setForm] = useState({
        tienda: '',
        telefono: '',
        direccion: ''
    })

    const handlerForm = (e)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }




    //Agregar la tienda
    const addTiendaSAC = async()=>{
        try{
            //Se llama al back para ingresar los datos
            const {data} = await axios.post('http://localhost:1433/td/addTiendaSAC', form);


            //ALERTA
            Swal.fire({
                title: data.message || 'Tienda Agregada',
                icon: 'success',
                timer: 4000
            });
        }catch(err){
            console.log(err);
            Swal.fire({
                title: err.response.data.message || `Error al añadir la tienda`,
                icon: 'error',
                timer: 4000
            });
        }
    }


    const urlDestino = '/'
    return(
        <>
        <a href={urlDestino}>
                <img src='LOGO.png'  alt='logouni' width={150} style={{position: 'absolute', top: '15px', left: '30px'}}></img>
        </a>
        <div className="d-flex align-items-center justify-content-center" style={{ backgroundColor: '#233D4D 50%'}}>
            <div className="container p-5" style={{margin: '50px'}}>
                <div className="title" style={{backgroundImage:'url(https://images.squarespace-cdn.com/content/v1/5f9c3ec3dae3d94c497ec2ef/1605038252112-94R44ZEUCNA4OYAGE73U/image.jpg?format=1000w)', padding:'50px', borderRadius:'40px'}}>
                    <ul>
                        <center>
                            <h1 className="text-center" style={{color: 'white'}}>Agregar Tienda</h1>
                        </center>
                    </ul>
                    <form>
                        <div className="container">
                            <div className="input-row">
                                <label htmlFor="tienda">Tienda:</label>
                                <input onChange={handlerForm} name="tienda" style={{padding:'10px', margin:'5px', border: '1px solid #ccc', borderRadius: '5px'}} type="text" placeholder="Ingrese la Tienda " />
                                <label htmlFor="telefono">Telefono:</label>
                                <input onChange={handlerForm} name="telefono" style={{padding:'10px', margin:'5px', border: '1px solid #ccc', borderRadius: '5px'}} type="text" placeholder="Ingrese el telefono " />
                            </div>
                            <div className="input-row">
                                <label htmlFor="direccion">Direccion:</label>
                                <input onChange={handlerForm} name="direccion" style={{padding:'10px', margin:'5px', border: '1px solid #ccc', borderRadius: '5px', width:'475px'}} type="text" placeholder="Ingrese la direccion de la tienda" />
                            </div>
                            <button onClick={(e)=> {addTiendaSAC(), e.preventDefault()}} className="btn" style={{backgroundColor: '#F3940C', borderRadius: 50}} type="submit">Agregar Tienda</button>
                        </div>
                    </form>
                    <Link to='/SAC' type="button" className="btn" style={{backgroundColor: 'red'}} >Regresar</Link>
                </div>
            </div>
        </div>
        </>
    )
}