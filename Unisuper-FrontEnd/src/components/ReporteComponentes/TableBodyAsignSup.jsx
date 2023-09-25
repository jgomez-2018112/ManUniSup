'use strict'
import React from 'react'
import { Link, useNavigate } from "react-router-dom";

export const TableBodyAsignSup = ({ index, IdUser, nombre, IdTienda, tienda, IdClase, clase }) => {

    
    const navigate = useNavigate()

    return (
        <tr key={index}>
            <td>{IdUser}</td>
            <td>{nombre}</td>
            <td>{IdTienda}</td>
            <td>{tienda}</td>
            <td>{IdClase}</td>
            <td>{clase}</td>
            <td>
                <button onClick={()=>{navigate('/UpdateSup', {state: {supervisor: {IdUser, nombre, IdTienda, tienda, IdClase, clase }}})}} type='button' className='btn btn-warning'>
                    Actualizar 
                </button>
            </td>
        </tr>
    )
}
