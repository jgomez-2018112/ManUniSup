'use strict'

import axios from "axios";
import { set } from "lodash";
import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Select from "react-select";
import Swal from "sweetalert2";




export const Insert4_TiendaPage = ()=>{
    //se instanca para poder pasar a la pagina principal
    const navigate = useNavigate()

    const [tipoClase, setTipoClase] = useState();
    const [persona, setPersona] = useState();
    const [selectListTipoClase, setSelectListTipoClase] = useState();
    const [selectListPersona, setSelectListPersona] = useState();
    const [form, setForm] = useState({
        id_tienda: '',
        id_tipo_clase: 0,
        id_persona: 0
    })

    const handlerForm = (e)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const addCompra = async()=>{
        try{
            //Se llama a el Back-end para poder guardar en la base de datos
            const {data} = await axios.post('http://localhost:1433/td/addTB_PSC_Supervisor_Compas_Tienda', form)

            //Alerta
            Swal.fire({
                title: data.message || 'Compra agregado con exito' ,
                text: "¿Deseas agregar otra Compra?",
                showDenyButton: true,
                confirmButtonColor: '#3085d6',
                denyButtonColor: '#d33',
                confirmButtonText: "Agregar otro",
                denyButtonText: "Ya no",
                icon: 'success',
                timer: 10000
            }).then((result)=>{
                if(result.isDenied){
                    navigate('/INFRA');
                    Swal.fire({
                        title: 'REGISTRO DE TIENDA COMPLETADO',
                        icon: 'success',
                        timer: 4000
                    })
                }

            });
        }catch(err){
            console.log(err);
            Swal.fire({
                title: err.response.data.message || `Error al añadir la Compra`,
                icon: 'error',
                timer: 4000
            })
        }
    }


    //Traer el tipo de clase
    const getTipoClase = async()=>{
        try{
            //Se llama al Back-end para Traer los tipos de clases de la base de datos
            const { data } = await axios.get('http://localhost:1433/td/getTipoClase')

            //Se setean los datos en una Lista para mostrarlos en el Select
            setTipoClase(data.message)
            const lista = data.message?.map(item =>({value: item.ID_Tipo_Clase, label: `${item.ID_Tipo_Clase} || ${item.Tipo_Clase}`}));
            setSelectListTipoClase(lista)
        }catch(err){
            console.log(err);
            Swal.fire({
                icon: 'error', 
                title: 'Oops...', 
                text: 'Error al obtener los datos de TB_Tipo_Clase' 
            })
        }
    }


    //traer a la persona de compra
    const getPersonaCompra = async()=>{
        try{
            //Se llama al Back-end para Traer la persona compra de la base de datos
            const { data } = await axios.get('http://localhost:1433/td/getPersonaCompra')

            console.log(data.message)
            //Se setean los datos en una Lista para mostrarlos en el Select
            setPersona(data.message)
            const lista = data.message?.map(item => ({value: item.ID_Persona, label: `${item.ID_Persona} || ${item.Nombre}`}));
            setSelectListPersona(lista)
        }catch(err){
            console.log(err);
            Swal.fire({
                icon: 'error', 
                title: 'Oops...', 
                text: 'Error al obtener los datos de TB_Persona_Compra' 
            })
        }
    }

    const handlerSelectTipoClase = (value, action)=>{
        setForm({
            ...form,
            id_tipo_clase: value.value
        })
    }

    const handlerSelectPersona = (value, action)=>{
        setForm({
            ...form,
            id_persona: value.value
        })
    }


    const {state: location} = useLocation()
    console.log(location.form);




    useEffect(()=> {
        getTipoClase();
        getPersonaCompra();
    
        setForm({
            ...form,

            id_tienda: location.form.id_tienda
        })
    }, [])
    return (
        <>
            <img src='LOGO.png' alt='logouni' width={150} style={{position: 'absolute', top: '15px', left: '30px'}}></img>
            <div className="d-flex align-items-center justify-content-center" style={{ backgroundColor: '#233D4D 50%'}}>
                <div className="title" style={{backgroundImage:'url(https://images.squarespace-cdn.com/content/v1/5f9c3ec3dae3d94c497ec2ef/1605038252112-94R44ZEUCNA4OYAGE73U/image.jpg?format=1000w)', padding:'50px', borderRadius:'40px'}}>
                    <ul>
                        <h1 className="text-center" style={{color: 'white'}}>CREAR TIENDA COMPRAS 4/4</h1>
                    </ul>
                    <form>
                        <div className="container">
                            <div className="input-row">
                                <h4><label htmlFor="tienda">Tienda: {location.form.tienda}</label></h4>
                                <label htmlFor="id_tienda">ID Tienda: </label>
                                <input onChange={handlerForm} name='id_tienda' style={{padding:'10px', margin:'5px', border: '1px solid #ccc', borderRadius: '5px'}} type="text" value={location.form.id_tienda} disabled />
                            </div>
                            <div className="input-row">
                                <label htmlFor="id_tipo_clase" style={{margin: '10px'}}>Tipo Clase: </label>

                                <Select 
                                    onChange={handlerSelectTipoClase}
                                    options={selectListTipoClase}
                                    placeholder='Seleccione el tipo clase'
                                    isSearchable={true}
                                />
                                <label htmlFor="id_tipo_clase" style={{margin: '10px'}}>ID Persona Compra: </label>

                                <Select
                                    onChange={handlerSelectPersona}
                                    options={selectListPersona}
                                    placeholder='Seleccione la compra'
                                    
                                
                                />
                            </div>
                        </div>
                        <button id="registro" onClick={(e)=>{addCompra(),e.preventDefault()}} className="btn" style={{backgroundColor: '#F3940C', borderRadius: 50}} type="submit">Registrar</button>
                    </form>
                </div>

            </div>
        
        
        </>
    )
}