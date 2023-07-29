import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import NoAuthorized from '../ui/NoAuthorized';
import '../../index.css';
import Create from './Create';
import jsPDF from 'jspdf';
import { obtenerTodos } from '../../services/public/DelitoService';
import Edit from './Edit';
import { deleteDelito } from '../../services/private/DelitoService';
import Swal from 'sweetalert2';

export default function Crimes() {

    const { isAdmin } = useContext(AuthContext);
    const table = useRef();
    const [delitos, setDelitos] = useState([]);
    const [idDelito, setIdDelito ] = useState(0)

    const print = () => {
        const pdf = new jsPDF("p", "mm", "a4");
        pdf.fromHTML(table.current);
        pdf.save("pdf");
    }

    const handleDelito = (id) =>{
        setIdDelito(id);
        console.log(id);
    }

    async function cargarDelitos() {
        const response = await obtenerTodos();
        const body = await response.data;
        setDelitos(body);
    }
    
    async function borrarDelito(id){
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            input: 'text',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            inputValidator: (value) => {
                if (!value) {
                    return 'You need confirm typing "Si"!'
                }
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteDelito(id)
                    .then(() => {
                        Swal.fire(
                            'Deleted!',
                            `Product removed`,
                            'success'
                        )
                    }).catch(err => {
                        Swal.fire(
                            'Error!',
                            `Internal Server Error`,
                            'error'
                        )
                        console.log(err);
                        console.log(err.response?.data[0]);
                    });
                cargarDelitos();
            }else{
                return 'Something wrong'
            }
        });
    }
    useEffect(() => {
        cargarDelitos();
    }, []);

    return (
        <>
            {isAdmin &&
                (<div className="container" ref={table}>
                    <div className="table-responsive mb-5" >
                        <table className="table" >
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Descripción</th>
                                    <th scope="col">Agregado por</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    delitos.length > 0 &&
                                    delitos.map((delito, index) => {
                                        return (
                                            <tr className="table-active" key={index}>
                                                <th scope="row"> {index} </th>
                                                <td>{delito.nombre}</td>
                                                <td>{delito.descripcion}</td>
                                                <td>{delito.usuario}</td>
                                                <td>
                                                    <button
                                                        data-bs-toggle="modal"
                                                        href={"#editModalToggle"}
                                                        className="btn btn-outline-primary"
                                                        title="Editar"
                                                        onClick={() => handleDelito(delito.id) }
                                                    >
                                                        <i className="fa fa-edit"></i>
                                                    </button>
                                                    <button
                                                        className="btn btn-outline-danger"
                                                        title="Eliminar este"
                                                        onClick={() => borrarDelito(delito.id)}
                                                    >
                                                        <i className="fa fa-trash-alt"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <button
                        data-bs-toggle="modal"
                        href={"#createModalToggle"}
                        className="btn btn-outline-success"
                        title="Agregar nuevo"
                    >
                        <i className="fas fa-plus-circle"></i>
                    </button>

                    <button
                        className="btn btn-outline-primary"
                        title="Imprimir PDF"
                        onClick={print}
                    >
                        <i className="fas fa-print"></i>
                    </button>
                </div>)
            }
            {
                !isAdmin && (
                    <NoAuthorized />
                )
            }
            <Create id={"createModalToggle"} getDelitos={cargarDelitos}/>
            <Edit idModal={"editModalToggle"} idDelito={idDelito} getDelitos={cargarDelitos} />
        </>
    )
}
