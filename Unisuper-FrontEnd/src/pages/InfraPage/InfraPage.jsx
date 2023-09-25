import React from "react";
import { Link, Outlet } from "react-router-dom";
import Swal from 'sweetalert2'
import axios from 'axios'



export const InfraPage = ()=>{

    const urlDestino = '/'
    return (
        <>
            <a href={urlDestino}>
                <img src='LOGO.png'  alt='logouni' width={150} style={{position: 'absolute', top: '15px', left: '30px'}}></img>
            </a>
           <div className="d-flex align-items-center justify-content-center" style={{ backgroundColor: '#233D4D 50%'}} >
                <div className="container p-5" style={{margin: '50px'}}>
                    <div className="title" style={{backgroundImage:'url(https://images.squarespace-cdn.com/content/v1/5f9c3ec3dae3d94c497ec2ef/1605038252112-94R44ZEUCNA4OYAGE73U/image.jpg?format=1000w)', padding:'50px', borderRadius:'40px'}}>
                        <ul>
                            <center>
                            <h1 className="text-center" style={{color: 'white'}}>INFRAESTRUCTURA</h1>
                            </center>
                        </ul>
                        <div className="container">
                            <div className="input-row">
                                <Link to='/USERINFRA' type="button" className="btn btn-light">
                                    Agregar Usuario                       
                                </Link>
                                <Link to='/AsigSupReport' type="button" className="btn btn-light">
                                    Asignar Supervisor
                                </Link>
                                <Link to='/FORM1Tienda' type="button" className="btn btn-light">
                                    Agregar Tienda
                                </Link>
                                <Link to='/REPORTES' type="button" className="btn btn-light">
                                    Reportes
                                </Link>
                            </div>
                            <br />
                            <Link to='/' type='button' className="btn" style={{backgroundColor:'red'}}>Regresar</Link>
                        </div>
                    </div>
                </div>
            </div>
          
        </>
    )
}