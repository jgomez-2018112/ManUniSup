import React from 'react'

export const TableBodySup = ({index, IdUser, nombre, IdTienda, tienda}) => {
    return (
        <tr key={index}>
            <td>{IdUser}</td>
            <td>{nombre}</td>
            <td>{IdTienda}</td>
            <td>{tienda}</td>
        </tr>
    )
}
