import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { TableBodySup } from '../../../components/ReporteComponentes/TableBodySup'
import Table from 'react-bootstrap/Table'
import Pagination from 'react-bootstrap/Pagination'
import * as XLSX from "xlsx"
import Swal from 'sweetalert2'
import { returnPagination } from '../../../utils/paginationUtils'
import { LoadScreen } from '../../../components/loadScreen'
import { Link } from "react-router-dom";

export const ReporteTecPage = () => {

  //Signo de Carga
  const [IsLoading, setIsLoading] = useState(true);


  /* DATA */
  const [tecnicos, setTecnicos] = useState([])

  /* FILTROS */
  const [searchName, setSearchName] = useState('')
  const [searchTienda, setSearchTienda] = useState('')

  /* PAGINACION */
  const [pages, setPages] = useState(0)
  const [restOfPages, setRestOfPages] = useState(0)
  const [itemPagination, setItemPagination] = useState()
  const [paginatedList, setPaginatedList] = useState()
  const [pageSelected, setPageSelected] = useState(1)

  const [cantOfRegisters, setCantOfRegisters] = useState(0)
  const [registersInThisPage, setRegistersInThisPage] = useState(0)

  /*EXCEL*/ 
  const [loadingExcel, setLoadingExcel] = useState(false);

  //TRAER A TECNICOS
  const getTecnicos = async () => {
    try {
      const { data } = await axios.get('http://localhost:1433/reporte/getTec')

      let lengthArray = data.message.length

      /* Setear estados */
      setTecnicos(data.message)

      /* Setear numero de paginas */
      setPages((lengthArray % 10) === 0 ? (lengthArray / 10) : Math.ceil(lengthArray / 10))

      setCantOfRegisters(lengthArray)

      const list = data.message?.slice(restOfPages, (pageSelected * 10))

      setPaginatedList(list)
      setRegistersInThisPage(restOfPages + list?.length)
      setIsLoading(false)
    } catch (err) {
      console.error(err)
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Error al obtener los datos' })
    }
  }


  //EXCEL
  const handleExcel = () =>{
    setLoadingExcel(true)


    //Esamblar libro y hoja excel
    const libro = XLSX.utils.book_new()
    const hoja = XLSX.utils.json_to_sheet(filteredTecnicos)

    //Agregar hoja al libro con el nombre de "Tecnicos"
    XLSX.utils.book_append_sheet(libro, hoja, 'Tecnicos');

    //Guardar Archivo
    setTimeout(() =>{
      //Si el archivo esta vacio, no se debe exportar
      if(filteredTecnicos?.length === 0 ){
        Swal.fire({icon: 'error', title: 'Oops...', text: 'No hay datos para exportar'})
        setLoadingExcel(false)
        return;
      }

      //Generar archivo con el nombre "Supervisores_Reporte.xlsx" o "Supervisores_Reporte_Filtrado.xlsx" si se aplicaron filtros
      searchName || searchTienda ?
       XLSX.writeFile(libro, 'Tecnicos_Reporte_Filtrado.xlsx') :
       XLSX.writeFile(libro, 'Tecnicos_Reporte.xlsx')

      setLoadingExcel(false)


    },1000)





  }

  const filteredTecnicos = tecnicos?.filter((item) =>
    item.nombre.toLowerCase().includes(searchName.toLowerCase()) &&
    item.Tienda.toLowerCase().includes(searchTienda.toLowerCase())
  )

  const setLists = () => {
    let lengthArray = filteredTecnicos?.length
    let filteredArray = filteredTecnicos?.slice(restOfPages, (pageSelected * 10)) || []

    setCantOfRegisters(lengthArray)
    setPaginatedList(filteredArray)

    setPages((lengthArray % 10) === 0 ? (lengthArray / 10) : Math.ceil(lengthArray / 10))
    setRegistersInThisPage(restOfPages + filteredArray?.length)
  }

  useEffect(() => {
    getTecnicos()
  }, [])

  useEffect(() => {
    setLists()
  }, [pageSelected, searchName, searchTienda])

  useEffect(() => {
    let list = []

    returnPagination(pages, pageSelected, 10, 1).map((value) => ( console.log(value)))
      list.push(returnPagination(pages, pageSelected, 10, 1).map((value) => (
        (typeof value) === 'string' ? (<Pagination.Ellipsis key={value}/>) : (
          <Pagination.Item
            key={value}
            onClick={() => { setPageSelected(value); setRestOfPages((value - 1) * 10); }}
            active={value === pageSelected}
          >
            {value}
          </Pagination.Item>
        ))
    ))

    setItemPagination(list)
  }, [pages, pageSelected])

  return (
    IsLoading? (<LoadScreen />): ( 
    <div className='container-fluid bg-white rounded'>
      <div className='container bg-white shadow-lg rounded p-5'>

        <h1>Reporte de Técnicos</h1>

        <h3 className='text-start'>Filtros</h3>
        <div className='row'>
          <div className='col-md-8'>
            <div className="input-group mb-8">
              <span className="bi bi-search input-group-text" id="basic-addon1">Nombre</span>
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                value={searchName}
                onChange={(e) => { setSearchName(e.target.value); setPageSelected(1); setRestOfPages(0) }}
              />

            </div>
            <br />
            <div className='input-group mb-8'>
              <span className="bi bi-search input-group-text" id="basic-addon1">Tienda</span>
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                value={searchTienda}
                onChange={(e) => { setSearchTienda(e.target.value); setPageSelected(1); setRestOfPages(0) }}
              />
            </div>
            <br />
          </div>
        </div>

        <div className='row align-items-center'>
          <div className='col'>
            <h5 className='text-start'>({cantOfRegisters}) Resultados</h5>
          </div>

          <div className='col-auto text-center'>
          {
            !loadingExcel ? (
              searchName || searchTienda ? (
                <button className='btn btn-success mb-3 d-flex justify-content-start' onClick={handleExcel}>Exportar excel filtrado</button>
              ) : (
                <button className='btn btn-success mb-3 d-flex justify-content-start' onClick={handleExcel}>Exportar excel</button>
              
              )
            ) : (
              <button className='btn btn-success mb-3 d-flex justify-content-start' disabled>
                  <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                  <span role="status" className="visually-hidden">Exportando excel...</span>
                </button>
            )
          }
          </div>
        </div>


        <div className='table-responsive'>
          <Table striped bordered hover className="table table-striped">
            <thead>
              <tr>
                <th>ID Persona</th>
                <th>Nombre</th>
                <th>ID Tienda</th>
                <th>Tienda</th>
              </tr>
            </thead>

            <tbody>
              {
                paginatedList?.map((item, index) => (
                  <TableBodySup
                    key={index}
                    index={index}
                    IdUser={item.ID_Persona}
                    nombre={item.Nombre}
                    IdTienda={item.ID_Tienda}
                    tienda={item.Tienda}
                  />
                ))
              }

            </tbody>
          </Table>
        </div>


        <h6 className='text-center'>Mostrando {restOfPages + 1} - {registersInThisPage}</h6>


        <div className='container d-flex justify-content-center'>
          <Pagination>
            <Pagination.Prev onClick={() => {
              if (pageSelected > 1) {
                setRestOfPages(restOfPages - 10)
                setPageSelected(pageSelected - 1)
              } else {
                setRestOfPages((pages - 1) * 10)
                setPageSelected(pages)
              }
              }}
            />

            {
              itemPagination?.map((item) => {
                return item;
              })
            }

            <Pagination.Next onClick={() => {
              if (pageSelected < pages) {
                setRestOfPages(restOfPages + 10)
                setPageSelected(pageSelected + 1)
              } else {
                setRestOfPages(0)
                setPageSelected(1)
              }
              }}
            />
          </Pagination>
        </div>
        <Link to='/REPORTES' type="button" className="btn" style={{backgroundColor: 'red'}}>Regresar</Link>
      </div>
    </div>
    )
  )
}
