import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Select from "react-select";
import { HomePage } from "../../HomePage/HomePage";



export const UsuariosInfra = ()=>{

  //Se setean los datos
  const [rol, setRoles] = useState()
  const [selectList, setSelectList] = useState();
  const [form, setForm] = useState({
    telefono: 0,
    nombre: '',
    correo: '',
    id_rol: 0,
    id_usuario: '',
    contraseña: ''
  });


  const handlerFrom =  (e)=>{
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
          console.log(pattern.test(form.id_usuario))
          if(!pattern.test(form.id_usuario)){
              return Swal.fire({
                  title: `No  usar Caracteres especiales :(`,
                  text: `No uses caracteres especiales en el campo usuario ${form.id_usuario}`,
                  icon: 'error',
                  timer: 4000
              })
          }  
          const { data } = await axios.post('http://localhost:1433/user/insertUserINFRA', form);
            Swal.fire({
              title: data.message || 'Persona Agregada',
              icon: 'success',
              timer: 4000
            })
    
        }catch(err){
          console.log(err)
          Swal.fire({
            title: err.response.data.message || `Error al añadir a la Persona :(`,
            text: err.response.data.error,
            icon: 'error',
            timer: 4000
          })
        }
      }




      const getRol = async()=>{
        try{
            //Se traen los datos Back-end 
            const { data } = await axios.get('http://localhost:1433/user/getRolInfra');

            //Se setean los datos al Select
            setRoles(data.message);
            const lista = data.message?.map(item =>({value: item.ID_Tipo_Usuario, label: `${item.ID_Tipo_Usuario} || ${item.Tipo_Usuario}`}));
            setSelectList(lista);
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
            id_rol: value.value 
        })
    }

    
      const urlDestino = '/'
  

      useEffect(()=> {getRol();
        console.log(rol);
    }, []);
    return(
        <>
        <a href={urlDestino}>
          <img src='LOGO.png'  alt='logouni' width={150} style={{position: 'absolute', top: '15px', left: '30px'}}></img>
        </a>
            <div className="d-flex align-items-center justify-content-center" style={{ backgroundColor: '#233D4D 50%'}} >
                <div className="container p-5" >
                <div className="title" style={{backgroundImage:'url(https://images.squarespace-cdn.com/content/v1/5f9c3ec3dae3d94c497ec2ef/1605038252112-94R44ZEUCNA4OYAGE73U/image.jpg?format=1000w)', padding:'50px', borderRadius:'40px'}}>
                    <ul>
                        <center>
                            <h1 className="text-center" style={{color: 'white'}}>USUARIOS UNISUPER INFRA</h1>
                        </center>
                    </ul>
                    <form>
                      <div className="container">
                          <div className= "input-row" >
                            <label htmlFor="telefono">Telefono:</label>
                            <input onChange={handlerFrom} name="telefono" id='telefono' style={{padding:'10px', margin:'5px', border: '1px solid #ccc', borderRadius: '5px'}}  type="text" placeholder="Ingrese telefono ☎️"></input>
                            <label htmlFor="nombre">Nombre:</label>
                            <input onChange={handlerFrom} name="nombre" id='nombre' style={{padding:'10px', margin:'5px', border: '1px solid #ccc', borderRadius: '5px'}} type="text" placeholder="Ingrese nombre 🦲"></input>
                          </div>
                          <br />
                          <div className="input-row">
                            <label htmlFor="Correo">Correo:</label>
                            <input onChange={handlerFrom} name="correo" id='correo' style={{padding:'10px', margin:'5px', border: '1px solid #ccc', borderRadius: '5px'}} type="email" placeholder="Ingrese su correo ✉️"></input>
                            <label htmlFor="id_usuario">Usuario:</label>
                            <input onChange={handlerFrom} name="id_usuario" id='id_usuario' style={{padding:'10px', margin:'5px', border: '1px solid #ccc', borderRadius: '5px'}} type="text" placeholder="Ingrese un usuario 👤"></input>

                          </div>
                          <br />
                          <div className="input-row">
                            <label htmlFor="contraseña">Contraseña:</label>
                            <input onChange={handlerFrom} name="constraseña" id='contraseña' style={{padding:'10px', margin:'5px', border: '1px solid #ccc', borderRadius: '5px'}} type="text" placeholder="Ingrese contraseña 🔑"></input>
                            <br />
                            
                            <label htmlFor="id_rol" style={{margin: '10px'}}>Rol:</label>
                            <Select 
                            onChange={handlerSelect}
                            options={selectList}
                            placeholder='Escoja un rol'
                            isSearchable={true}
                          />
                          </div>
                      </div>
                      <br />
                      <button onClick={(e)=> {addPersona(), e.preventDefault()}} className="btn" style={{backgroundColor: '#F3940C', borderRadius: 50}} type="submit" >Registrar Persona</button>
                    </form>
                    <Link to='/INFRA' type="button" className="btn" style={{backgroundColor: 'red'}}>Regresar</Link>
                </div>
            </div>
            </div>
        </>
    )
}

