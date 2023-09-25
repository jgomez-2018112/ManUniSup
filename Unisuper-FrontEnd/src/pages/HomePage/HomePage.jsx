import React from "react";
import { Link } from "react-router-dom";
import '../../App.css'
import { flatten } from "lodash";

export const HomePage = ()=>{

    return (
        <>
            <img src='LOGO.png' alt='logouni' width={150} style={{position: 'absolute', top: '15px', left: '30px'}}></img>
            <div className="d-flex align-items-center justify-content-center" style={{ backgroundColor: '#233D4D 50%'}} >
                <div className="container p-5" style={{margin: '90px'}}>
                    <div className="title" style={{backgroundImage:'url(https://images.squarespace-cdn.com/content/v1/5f9c3ec3dae3d94c497ec2ef/1605038252112-94R44ZEUCNA4OYAGE73U/image.jpg?format=1000w)',textAlign:'center', padding:'50px', borderRadius:'40px' }}>
                        <ul>          
                            <center>
                            <h1 className="text-center" style={{color: 'white'}}>MANTENIMIENTO UNISUPER</h1>
                            </center>
                        </ul>
                        <div className="container">
                            <div className="input-row">
                                <Link to='/INFRA' type="button" className="btn btn-light">
                                    InfraEstructura                       
                                </Link>
                                <Link to='/SAC' type="button" className="btn btn-light">
                                    SAC
                                </Link>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}