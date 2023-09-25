'use strict'

import axios from "axios"
import React, { useEffect, useLayoutEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import Select from "react-select"




export const Insert3_TiendaPage = ()=>{
    //Se instancia para poder pasar dartos al siguiente formulario
    const navigete = useNavigate();

    //Se instancia la seleccion de los datos
    const [clase, setClase] = useState()
    const [persona, setPersona] = useState();
    const [selectListClase, setSelectListClase] = useState();
    const [selectListPersona, setSelectListPersona] = useState();
    const [form, setForm] = useState({
        id_tienda: '',
        clase: 0,
        id_persona: 0
    })

    const handlerForm = (e)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const addTecINFRA = async()=>{
        try{
            //Se llama a el Back-end para poder guardar en la base de datos
            const { data } = await axios.post('http://localhost:1433/td/addTB_PSE_Supervisor_Tecnico_Tienda', form);

            //Alerta
            Swal.fire({
                title: data.message || 'Tec agregado con exito' ,
                text: "¿Deseas agregar otro Tecnico a la Tienda?",
                showDenyButton: true,
                confirmButtonColor: '#3085d6',
                denyButtonColor: '#d33',
                confirmButtonText: "Agregar otro",
                denyButtonText: "Ya no",
                icon: 'success',
                timer: 10000
            }).then((result)=>{
                if(result.isDenied){
                    navigete('/FORM4Tienda', {state: {form: location.form}});
                }

            });
        }catch(err){
            console.log(err)
            Swal.fire({
                title: err.response.data.message || `Error al añadir el Tecnico`,
                icon: 'error',
                timer: 4000
            })
        }
    }



    //Se traen las clases de tecnicos de la base de datos
    const getClasePersona = async()=>{
        try{
            //Se llama al Back-end para Traer las clases de la base de datos
            const {data} = await axios.get('http://localhost:1433/td/getClaseTec');

            //Se setean los datos en una Lista para mostrarlos en el Select
            setClase(data.message);
            const lista = data.message?.map(item => ({value: item.ID_Clase, label: `${item.ID_Clase} || ${item.Clase}`}));
            setSelectListClase(lista)
        }catch(err){
            console.log(err);
            Swal.fire({
                icon: 'error', 
                title: 'Oops...', 
                text: 'Error al obtener los datos de TB_Clase' 
            })
        }
    }


    //Se traen a los ususarios de Infraestructura de la base de datos
    const getPersonaINFRA = async()=>{
        try{
            //Se llama al Back-end para Traer los datos de la base
            const { data } = await axios.get('http://localhost:1433/user/getPersonaINFRA')

            //Se setean los datos en una Lista para mostrarlos en el Select
            setPersona(data.message);
            const lista = data.message?.map(item => ({value: item.ID_Persona, label: `${item.ID_Persona} || ${item.Nombre}`}));
            setSelectListPersona(lista);
        }catch(err){
            console.log(err);
            Swal.fire({
                icon: 'error', 
                title: 'Oops...', 
                text: 'Error al obtener los datos de TB_Persona' 
            })
        }
    }

    const handlerSelectClase = (value, action)=>{
        setForm({
            ...form,
            clase: value.value
        })
    }
    const handlerSelectPersona = (value, action)=>{
        setForm({
            ...form,
            id_persona: value.value
        })
    }



    //Se tran los datos del formulario2
    const {state: location} = useLocation();
    console.log(location.form);


    useEffect(()=> {
        getClasePersona(); 
        getPersonaINFRA();
        console.log(clase);
    
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
                        <h1 className="text-center" style={{color: 'white'}}>CREAR TIENDA ASIGN TEC 3/4</h1>
                    </ul>
                    <form>
                        <div className="container">
                            <div className="input-row">
                                <h2><label htmlFor="tienda">Tienda: {location.form.tienda}</label></h2>
                                <label htmlFor="id_tienda">ID_tienda</label>
                                <input  onChange={handlerForm} name='id_tienda' style={{padding:'10px', margin:'5px', border: '1px solid #ccc', borderRadius: '5px'}} type="text" value={location.form.id_tienda} disabled />
                            </div>
                            <div className="input-row">
                                <label htmlFor="clase" style={{margin: '10px'}}>Clase: </label>
                                
                                <Select 
                                    onChange={handlerSelectClase}
                                    options={selectListClase}
                                    placeholder= 'Escoja la clase del Tecnico'
                                    isSearchable={true}
                                />
                                <label htmlFor="id_persona" style={{margin: '10px'}}>ID Persona: </label>
                                <Select 
                                    onChange={handlerSelectPersona}
                                    options={selectListPersona}
                                    placeholder='Seleccione al Tecnico'
                                    isSearchable={true}
                                />
                                
                            </div>
                        </div>
                        <button id="registro" onClick={(e)=>{addTecINFRA(),e.preventDefault()}} className="btn" style={{backgroundColor: '#F3940C', borderRadius: 50}} type="submit">Registrar</button>
                    </form>
                </div>
            </div>
        </>
    )
}