import React, { useEffect, useState } from "react";
import {  Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Select from "react-select";

export const Insert2_TiendaPage = ()=>{
    //Se instancia una variable pasar datos a otra pagina
    const navigate = useNavigate()

    //Seleccon de los datos
    const [Sup, setSup] = useState();
    const [selectList, setSelectList] = useState();
    const [form, setForm] = useState({
        id_tienda: '',
        id_usuario_1: 0
    });
    ;
    const handlerFrom = (e)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    //Agregar un supervisor
    const addSup = async()=>{
        try{
            //Se llama a el Back-end para poder guardar en la base de datos
            const { data } = await axios.post('http://localhost:1433/td/addTB_PT_Tienda_Persona', form);

            //Alerta
            Swal.fire({
                title: data.message || 'Sup agregado con exito' ,
                icon: 'success',
                timer: 4000
            }).then();

            //Se pasan los datos al tercer formulario
            navigate('/FORM3Tienda', {state: {form: location.form}}) 
        }catch(err){
            console.log(err);
            //Alerta
            Swal.fire({
                title: err.response.data.message || `Error al añadir el Supervisor`,
                icon: 'error',
                timer: 4000
            })
        }
    }


    //trae las personas para el insert
    const getPersonas = async()=>{
        try{
            //Se llama al Back-end para Traer los datos de la base
            const { data } = await axios.get('http://localhost:1433/user/getPersonaINFRA')

            //Se setean los datos en una Lista para mostrarlos en el Select
            setSup(data.message)
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


    //Funcion para que la seleccion del Select sea un valor
    const handlerSelect = (value, action)=>{
        setForm({
            ...form,
            id_usuario_1: value.value 
        })
    }


    //llegan los datos del primer formulario
    const { state: location } = useLocation();
    console.log(location.form)
    

    //Se cargan los datos al momento de iniciar la pagina
    useEffect(()=> {getPersonas();
        console.log(Sup);
        
        setForm({
            ...form,
            id_tienda: location.form.id_tienda
        })
    
    
    }, []);
    
    return(
        <>
            <img src='LOGO.png' alt='logouni' width={150} style={{position: 'absolute', top: '15px', left: '30px'}}></img> 
                <div className="d-flex align-items-center justify-content-center" style={{ backgroundColor: '#233D4D 50%'}}>
                    <div className="container p-5">
                        <div className="title" style={{backgroundImage:'url(https://images.squarespace-cdn.com/content/v1/5f9c3ec3dae3d94c497ec2ef/1605038252112-94R44ZEUCNA4OYAGE73U/image.jpg?format=1000w)', padding:'50px', borderRadius:'40px'}}>
                        <ul>
                            <h1 className="text-center" style={{color: 'white'}}>CREAR TIENDA ASIGN SUP 2/4</h1>
                        </ul>
                        <form name="SupForm" id="SupForm">
                            <div className="container"> 
                                <div className="input-row">
                                <h4><label htmlFor="tienda" style={{margin: '10px'}}>Tienda: {location.form.tienda}</label></h4>
                                <label htmlFor="id_tienda">ID Tienda:</label>
                                <input  onChange={handlerFrom} name="id_tienda" style={{padding:'10px', margin:'5px', border: '1px solid #ccc', borderRadius: '5px'}}  type="text" value={location.form.id_tienda} placeholder={location.form.id_tienda} disabled></input>
                                </div>
                                <div className="input-row">
                                <label htmlFor="id_usuario_1" style={{margin: '10px'}}>Supervisor:</label>
                                    <Select 
                                        onChange={handlerSelect}
                                        options={selectList}
                                        placeholder='Escoja al Supervisor'
                                        isSearchable={true}
                                    />
                                </div>
                            </div>
                            <button id="registro" onClick={(e)=>{ addSup(),e.preventDefault()}} className="btn" style={{backgroundColor: '#F3940C', borderRadius: 50}} type="submit">Registrar</button>
                        </form>
                        </div>
                    </div>
                </div>
        </>
    )
}