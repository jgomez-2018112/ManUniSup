'use strict'
import React, { useEffect, useState } from "react";
import {  Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Select from "react-select";




export const Insert1_TiendaPage = ()=>{
    
        
    //Seleccion de los datos
    const [Tipos, setTipos] = useState();
    const [selectList, setSelectList] = useState();
    const [form , setForm] = useState({
        id_tienda: '',
        tienda: '',
        id_tipo_tienda: 0 
    });
    ;
    //Se traen los datos al forms
    const  handlerFrom = (e)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    //Se instancia una variable pasar datos a otra pagina
    const navigate = useNavigate();


    

    const addTB_Tienda = async()=>{
        try{
            //Se llama a el Back-end para poder guardar en la base de datos
            const { data } = await axios.post('http://localhost:1433/td/addTB_T_Tienda', form);

            //Desabilitar el boton de registo
            const btnAgregar = document.getElementById('registro');
            btnAgregar.disabled = true;

           
            //Alerta
            Swal.fire({
                title: data.message || 'Tienda Agregada con exito' ,
                icon: 'success',
                timer: 4000
            }).then();

            //se envian los datos a el segundo formulario
            navigate('/FORM2Tienda', {state: {form}});
        }catch(err){
            console.log(err);
            //Alerta de error
            Swal.fire({
                title: err.response.data.message || `Error al añadir a la Tabla de Tienda :(`,
                icon: 'error',
                timer: 4000
            })
        }
    }


    
  
  
    const getTiposTiendas = async()=>{
        try{
            //Se traen los datos del Back-end
            const {data} = await axios.get('http://localhost:1433/td/getTipoTienda')
            
            //Se setean los datos en una Lista para mostrar en el Select
            setTipos(data.message)
            const lista = data.message.map(item =>({value: item.ID_Tipo_Tienda , label:`${item.ID_Tipo_Tienda}  ||  ${item.Tipo_Tienda}`}))
            setSelectList(lista)
        }catch(err){
            console.log(err);
            Swal.fire({ 
                icon: 'error', 
                title: 'Oops...', 
                text: 'Error al obtener los datos Tipo Tienda' 
            });
        }
    }


    //Funcion para que la seleccion del Select sea un valor
    const handlerSelect = (value, action)=>{
        setForm({
            ...form,
            id_tipo_tienda: value.value
        })
    }


    //Se cargan datos al momento de inicar la pagina
    useEffect(() => {getTiposTiendas();console.log(Tipos);}, []);
    return (
        <>
        <img src='LOGO.png' alt='logouni' width={150} style={{position: 'absolute', top: '15px', left: '30px'}}></img>
            <div className="d-flex align-items-center justify-content-center" style={{ backgroundColor: '#233D4D 50%'}}>
                <div className="container p-5">
                    <div className="title" style={{backgroundImage:'url(https://images.squarespace-cdn.com/content/v1/5f9c3ec3dae3d94c497ec2ef/1605038252112-94R44ZEUCNA4OYAGE73U/image.jpg?format=1000w)', padding:'50px', borderRadius:'40px'}}>
                        <ul>
                            <center>
                            <h1 className="text-center" style={{color: 'white'}}>CREAR TIENDA 1/4</h1>
                            </center>
                        </ul>
                        <form>
                            <div className="container">
                                <div className="input-row">
                                    <label htmlFor="id_tienda">ID Tienda:</label>
                                    <input onChange={handlerFrom} name="id_tienda" style={{padding:'10px', margin:'5px', border: '1px solid #ccc', borderRadius: '5px'}}  type="text" placeholder="Ingrese el ID de Tienda 🆔"></input>
                                    <label htmlFor="tienda">Tienda:</label>
                                    <input onChange={handlerFrom} name="tienda" style={{padding:'10px', margin:'5px', border: '1px solid #ccc', borderRadius: '5px'}}  type="text" placeholder="Nombre de Tienda 🏪"></input>
                                </div>
                                <div className="input-row">
                                    <label htmlFor="id_tipo_tienda" style={{margin: '10px'}}>Seleccione el tipo de Tienda :</label>
                                    <Select 
                                        onChange={handlerSelect}
                                        options={selectList} 
                                        placeholder= 'Seleccione el Tipo Tienda'
                                        isSearchable={true}
                                    />
                                </div>
                            </div>
                            <button id="registro" onClick={(e)=>{ addTB_Tienda() ,e.preventDefault()}} className="btn" style={{backgroundColor: '#F3940C', borderRadius: 50}} type="submit">Registrar</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
