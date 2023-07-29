import React, { useEffect, useState } from 'react'

import { crear, update } from '../../services/private/DelitoService'
import Swal from 'sweetalert2';
import { messages } from '../../utils/messages';

export default function Modal({title, id, delito, getDelitos}) {

    const [newDelito, setNewDelito] = useState({ nombre:'', descripcion:'', usuario_id: 0 })
    const [idUser, seIdUser] = useState(0)

    const handleChange = (e) =>{
        setNewDelito({...newDelito, [e.target.name]: e.target.value});
    }

    const handleCloseModal = () => {
        setNewDelito({});
        getDelitos();
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        
        if(id==="editModalToggle"){
            const data = {
                nombre: newDelito.nombre,
                descripcion: newDelito.descripcion,
                usuario_id: idUser,
            }
            if(delito){                
                await update(data, delito.id)
                .then((res) =>{
                    setNewDelito({
                        nombre:'',
                        descripcion:''
                    })
                    return Swal.fire('OK', messages.REG_EXITOSO, 'success');
                })
                .catch((err) => {
                    return Swal.fire('Error', messages.ERROR_REGISTRO_DELITO, 'error');
                })
            }
            
        }
        if(id==="createModalToggle"){
            const data = {
                nombre: newDelito.nombre,
                descripcion: newDelito.descripcion,
                usuario_id: idUser,
            }

            await crear(data)
                .then((res) =>{
                    setNewDelito({
                        nombre:'',
                        descripcion:''
                    })
                    return Swal.fire('OK', messages.REG_EXITOSO, 'success');
                })
                .catch((err) => {
                    return Swal.fire('Error', messages.ERROR_REGISTRO_DELITO, 'error');
                })
        }
    }

    useEffect(() => {
        let user = JSON.parse(sessionStorage.getItem('user'));
        seIdUser(user?.user?.id_usuario)
        if(delito){
            setNewDelito({
                nombre:delito.nombre,
                descripcion:delito.descripcion,
                usuario_id:delito.usuarioId
            });
        }
    },[delito])
    

    return (
        <div className="modal fade" id={id} aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalToggleLabel">{title}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
            </div>
            <div className="modal-body">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre</label>
                    <input
                    onChange={handleChange}
                    value={newDelito.nombre}
                    name="nombre"
                    type="text" className="form-control" id="name" aria-describedby="name"/>
                    <div id="name" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Descripción</label>
                    <input
                    onChange={handleChange}
                    value={newDelito.descripcion}
                    name="descripcion"
                    type="text" className="form-control" id="description"/>
                </div>
                
            </form>
            </div>
            <div className="modal-footer">
                <button onClick={(e) => handleSubmit(e)} className="btn btn-primary">Enviar</button>
            </div>
            </div>
        </div>
        </div>
    )
}
