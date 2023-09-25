'use strict'

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import axios from 'axios'
import Select from "react-select";


export const UsuariosSAC = ()=>{

    const [rol, setRoles] = useState();
    const [selectList, setSelectList] = useState();
    const [form, setForm] = useState({
        nombre: '',
        apellido:'',
        rol: 0,
        usuario: '',
        password: ''
    })

    const handlerFrom = (e)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
          
    }

    const addPersona = async()=>{
        try{  
            const pattern = /^[A-Z]+$/i
            ///^[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]+$/i 
            //const allow = /^(A-Za-z)*$/
            console.log(pattern.test(form.usuario))
            if(!pattern.test(form.usuario)){
                return Swal.fire({
                    title: `No  usar Caracteres especiales :(`,
                    text: `No uses caracteres especiales en el campo usuario ${form.usuario}`,
                    icon: 'error',
                    timer: 4000
                })
            }
            


            //Se llama al back para ingresar los datos
            const { data } = await axios.post('http://localhost:1433/user/insertUserSAC', form);

            

            //Alerta
            Swal.fire({
                title: data.message || 'Persona Agregada',
                icon: 'success',
                timer: 4000
            });

        }catch(err){
            console.log(err);
            Swal.fire({
                title: err.response.data.message || `Error al añadir a la Persona :(`,
                icon: 'error',
                timer: 4000
            });
        }    
    }


    //Se traen los roles
    const getRoles = async()=>{
        try{
             //Se traen los datos Back-end
             const {data} = await axios.get('http://localhost:1433/user/getRolSAC')

             //Se setean los datos al Select
             setRoles(data.message)
             const lista = data.message?.map(item =>({value: item.id, label: `${item.id} || ${item.Rol}`}));
             setSelectList(lista)
        }catch(err){
            console.log(err);
            Swal.fire({
                icon: 'error', 
                title: 'Oops...', 
                text: 'Error al obtener los datos de Rol'
              })
        }
    }


    const handlerSelect = (value, action)=>{
        setForm({
            ...form,
            rol: value.value
        })
    }
    const urlDestino = '/';



    useEffect(()=>{getRoles()},[])
    return (
        <>
            <a href={urlDestino}>
                <img src='LOGO.png'  alt='logouni' width={150} style={{position: 'absolute', top: '15px', left: '30px'}}></img>
            </a>
            <div className="d-flex align-items-center justify-content-center" style={{ backgroundColor: '#233D4D 50%'}}>
                <div className="container p-5">
                    <div className="title" style={{backgroundImage:'url(https://images.squarespace-cdn.com/content/v1/5f9c3ec3dae3d94c497ec2ef/1605038252112-94R44ZEUCNA4OYAGE73U/image.jpg?format=1000w)', padding:'50px', borderRadius:'40px'}}>
                        <ul>
                            <center>
                                <h1 className="text-center" style={{color: 'white'}}> USUARIOS UNISUPER SAC</h1>
                            </center>
                            
                        </ul>
                        <form>
                            <div className="container">
                                <div className= "input-row" >
                                    <label htmlFor="nombre">Nombre:</label>
                                    <input onChange={handlerFrom} name="nombre" id='nombre' style={{padding:'10px', margin:'5px', border: '1px solid #ccc', borderRadius: '5px'}} type="text" placeholder="Ingrese nombre 🦲"></input>
                                    <label htmlFor="apellidio">Apellido:</label>
                                    <input onChange={handlerFrom} name="apellido" id='apellido' style={{padding:'10px', margin:'5px', border: '1px solid #ccc', borderRadius: '5px'}}  type="text" placeholder="Ingrese apellido 🦲"></input>
                                </div>

                                <div className="input-row">
                                    <label htmlFor="usuario">Usuario:</label>
                                    <input onChange={handlerFrom} name="usuario" id='usuario' pattern="[A-Za-z0-9]{1,15}" style={{padding:'10px', margin:'5px', border: '1px solid #ccc', borderRadius: '5px'}} type="text" placeholder="Ingrese un usuario 👤" ></input>
                                    <label htmlFor="password">Contraseña:</label>
                                    <input onChange={handlerFrom} name="password" id='password' style={{padding:'10px', margin:'5px', border: '1px solid #ccc', borderRadius: '5px'}} type="text" placeholder="Ingrese contraseña 🔑"></input>
                                </div>
                                <div className= "input-row" >
                                    <label htmlFor="rol" style={{margin: '10px'}}>Rol:</label>
                                    <Select
                                    onChange={handlerSelect}
                                    options={selectList}
                                    placeholder='Selecciona un Rol'
                                    isSearchable={true}
                                    
                                    />
                                </div>
                            </div>
                            <button onClick={(e)=> {addPersona(), e.preventDefault()}} className="btn" style={{backgroundColor: '#F3940C', borderRadius: 50}} type="submit">Registrar Persona</button>
                        </form>
                        <Link to='/SAC' type="button" className="btn" style={{backgroundColor: 'red'}} >Regresar</Link>
                    </div>
                </div>

            </div>
        </>
    )
}