import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Select from 'react-select'
import Swal from 'sweetalert2'
import axios from 'axios'
import { Link } from "react-router-dom";

export const UpdateSupPage = () => {

    const navigate = useNavigate();


    //Signo de Carga
    const [IsLoading, setIsLoading] = useState(true);



    const [persona, setPersona] = useState();
    const [selectList, setSelectList] = useState();
    const [form, setForm] = useState({
        id_persona: 0,
        clase: 0,
        id_tienda: ''
    })
    
    const updateSup = async()=>{
        try{

            const { data } = await axios.put('http://localhost:1433/reporte/updateSup',form);
            
            //ALERTA
            Swal.fire({
                title: data.message || 'Sup agregado con exito' ,
                icon: 'success',
                timer: 4000
            }).then();

            navigate('/AsigSupReport')
        }catch(err){
            console.log(err);
            Swal.fire({
                title: err.response.data.message || `Error al añadir el Supervisor`,
                icon: 'error',
                timer: 4000
            })
        }
    }

    //trae las personas para el Update
    const getPersonas = async()=>{
        try{
            //Se llama al Back-end para Traer los datos de la base
            const { data } = await axios.get('http://localhost:1433/user/getPersonaINFRA')

            //Se setean los datos en una Lista para mostrarlos en el Select
            setPersona(data.message)
            const lista = data.message?.map(item  => ({value: item.ID_Persona, label: `${item.ID_Persona} || ${item.Nombre}`}));
            setSelectList(lista)
        }catch(err){
            console.log(err);
            Swal.fire({ 
                icon: 'error', 
                title: 'Oops...', 
                text: 'Error al obtener los datos de TB_Personas' 
            });
        }
    }

    const urlDestino = '/'


    const {state} = useLocation()
    const {supervisor} = state
    

    const handlerSelect = (value, action)=>{
        setForm({
            ...form,
            id_persona: value.value 
        })
    }

    useEffect(()=>{
        getPersonas()
        setForm({
            ...form,
            clase: supervisor.IdClase,
            id_tienda: supervisor.IdTienda
        })
        
    }, [])
  return (
    <>
        <a href={urlDestino}>
          <img src='LOGO.png'  alt='logouni' width={150} style={{position: 'absolute', top: '15px', left: '30px'}}></img>
        </a>
        <div className="d-flex align-items-center justify-content-center" style={{ backgroundColor: '#233D4D 50%'}} >
            <div className="container p-5" >
                <div className="title" style={{backgroundImage:'url(https://images.squarespace-cdn.com/content/v1/5f9c3ec3dae3d94c497ec2ef/1605038252112-94R44ZEUCNA4OYAGE73U/image.jpg?format=1000w)', padding:'50px', borderRadius:'40px'}}>
                    <ul>
                        <center>
                            <h1 className="text-center" style={{color: 'white'}}>ACTUALIZACION DE SUPERVISOR</h1>
                        </center>
                    </ul>
                    <form>
                        <div className='container'>
                            <div className='input-row'>
                                <label htmlFor="tienda" style={{margin:'10px'}}>Tienda: {supervisor.tienda}</label>
                                <label htmlFor="id_tienda" style={{width: '150px'}}>ID_Tienda: </label>
                                <input style={{padding:'10px', margin:'5px', border: '1px solid #ccc', borderRadius: '5px'}}  type="text" value={supervisor.IdTienda} disabled/>
                                
                            </div>
                            <div className='input-row'>
                                <label htmlFor="persona" style={{margin:'10px'}}>Nombre: {supervisor.nombre}</label>
                                <label htmlFor="id_persona">ID_Persona: </label>
                                <input style={{padding:'10px', margin:'5px', border: '1px solid #ccc', borderRadius: '5px'}} type="text" value={supervisor.IdUser} disabled/>                              
                            </div>
                            <div className='input-row'>
                                <label htmlFor="clase" style={{margin:'10px'}}>Clase: {supervisor.clase}</label>
                                <label htmlFor="id_clase">ID_Clase: </label>
                                <input style={{padding:'10px', margin:'5px', border: '1px solid #ccc', borderRadius: '5px', width:'150px'}} type="text" value={supervisor.IdClase} disabled/>
                            </div>
                            <br />    

                            <div className='input-row'>
                                <h3><label htmlFor="texto">Nuevo Supervisor</label></h3>
                                <Select 
                                    onChange={handlerSelect}
                                    options={selectList}
                                    placeholder='Seleccione al Supervisor'
                                    isSearchable={true}
                                />
                            </div>
                        </div>
                        <button id="registro" onClick={(e)=>{ updateSup(),e.preventDefault()}} className="btn" style={{backgroundColor: '#F3940C', borderRadius: 50}} type="submit">Actualizar Supervisor</button>
                    </form>
                    <Link to='/AsigSupReport' type="button" className="btn" style={{backgroundColor: 'red'}}>Regresar</Link>
                </div>
            </div>
        </div>
    </>
  )
}
