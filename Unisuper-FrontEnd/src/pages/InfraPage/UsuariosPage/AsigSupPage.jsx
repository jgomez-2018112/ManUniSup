
import axios from "axios";
import React, {useEffect , useState } from "react";
import Table from 'react-bootstrap/Table'
import Pagination from 'react-bootstrap/Pagination'
import { TableBodyAsignSup } from "../../../components/ReporteComponentes/TableBodyAsignSup";
import { returnPagination } from '../../../utils/paginationUtils'
import Swal from 'sweetalert2'
import { LoadScreen } from '../../../components/loadScreen'
import { Link } from "react-router-dom";

export const AsigSupPageReport = () => {

    //Signo de Carga
    const [isLoading, setIsLoading] = useState(true);

    /*DATA*/
    const [supervisores, setSupervisores] = useState([]);

      /* FILTROS */
    const [searchName, setSearchName] = useState('')
    const [searchTienda, setSearchTienda] = useState('')

    /* PAGINACION */
    //Numero de paginas de la tabla
    const [pages, setPages] = useState(0);
    //Desde que registro se va a mostrar
    const [restOfPages, setRestOfPages] = useState(0);
    //Items de paginacion (paginas)
    const [itemPagination, setItemPagination] = useState();
    //Lista de registros que se van a mostrar
    const [paginatedList, setPaginatedList] = useState();
    //Pagina seleccionada actualmente
    const [pageSelected, setPageSelected] = useState(1);

    //Cantidad de registros totales
    const [cantOfRegisters, setCantOfRegisters] = useState(0);
    //Cantidad de registros que se muestran en la pagina actual
    const [registersInThisPage, setRegistersInThisPage] = useState(0);

    const getSup = async()=>{
        try{
            //Se llama al back para llamar los datos
            const {data} = await axios.get('http://localhost:1433/reporte/getAsignSup')

            let lengthArray = data.message.length

            /* Setear estados */
            //Set data total
            setSupervisores(data.message)

           /* Setear numero de paginas */
           //Si el resto de la division es 0, entonces el numero de paginas es el resultado de la division ya que es entero
            //Si no, se redondea hacia arriba para ingresar los datos restantes (10 registros por pagina)
            setPages((lengthArray % 10) === 0 ? (lengthArray / 10) : Math.ceil(lengthArray / 10));
            
            //Setear cantidad de registros totales
            setCantOfRegisters(lengthArray)

            //Setear registros que se van a mostrar
            const list = data.message?.slice(restOfPages, (pageSelected * 10));

            //Setear registros que se van a mostrar en la pagina actual
            setPaginatedList(list)  
            setRegistersInThisPage(restOfPages + list?.length)

            console.log(data.message)
            setIsLoading(false)
        } catch(err) {
            console.error(err)
            Swal.fire({ 
                icon: 'error', 
                title: 'Oops...', 
                text: 'Error al obtener los datos' 
            })
        }
    }

    //Lista con filtro de supervisores
    const filteredSupervisores = supervisores?.filter((sup) =>
        sup.Nombre.toLowerCase().includes(searchName.toLowerCase()) &&
        sup.Tienda.toLowerCase().includes(searchTienda.toLowerCase())
    )

    const setLists = () => {
        let lengthArray = filteredSupervisores?.length
        let filteredArray = filteredSupervisores?.slice(restOfPages, (pageSelected * 10))

        //Cantidad de registros con los filtros aplicados
        setCantOfRegisters(lengthArray)

        //Setear registros que se van a mostrar
        setPaginatedList(filteredArray)

        /* Setear nuevo numero de paginas */
        //Si el resto de la division es 0, entonces el numero de paginas es el resultado de la division ya que es entero
        //Si no, se redondea hacia arriba para ingresar los datos restantes (10 registros por pagina)
        setPages((lengthArray % 10) === 0 ? (lengthArray / 10) : Math.ceil(lengthArray / 10 )) 

        setRegistersInThisPage(restOfPages + (filteredArray?.length))
    }

    useEffect(() => {
        getSup()
    }, [])

    useEffect(() => {
        setLists()

    }, [pageSelected, searchName, searchTienda])

    useEffect(() => {
        let list = []

        list.push(returnPagination(pages, pageSelected, 10, 1).map((value) => (
            (typeof value === 'string') ? (<Pagination.Ellipsis key={value}/>) : (
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

    return(
        isLoading? (<LoadScreen />):(
            <div className='container-fluid bg-white rounded'>
                <div className='container bg-white shadow-lg rounded p-5'>
                    <h1>Asignacion de Supervisor</h1>

                    <h3 className='text-start'>Filtros</h3>

                    <div className="row">
                        <div className="col-md-8">
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

                            <div className="input-group mb-8">
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



                    </div>
                    <div className='table-responsive'>
                        <Table striped bordered hover className="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID_Persona</th>
                                    <th>Nombre</th>
                                    <th>ID_Tienda</th>
                                    <th>Tienda</th>
                                    <th>ID_Clase</th>
                                    <th>Clase</th>
                                    <th>Confirmacion</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    paginatedList?.map((item, index) => (
                                        <TableBodyAsignSup
                                            key={index}
                                            index={index}
                                            IdTienda={item.ID_Tienda}
                                            tienda={item.Tienda}
                                            IdUser={item.ID_Persona}
                                            nombre={item.Nombre}
                                            IdClase={item.ID_Clase}
                                            clase={item.Clase}
                                        />
                                    ))
                                }
                            </tbody>
                        </Table>
                    </div>

                    <h6 className='text-center'>Mostrando {restOfPages + 1} - {registersInThisPage}</h6>


                    <div className='container d-flex justify-content-center'>
                        <Pagination>
                            <Pagination.Prev onClick={()=>{
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
                    <Link to='/INFRA' type="button" className="btn" style={{backgroundColor: 'red'}}>Regresar</Link>
                </div>
            </div>
        )
    )
}