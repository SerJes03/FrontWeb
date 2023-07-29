import React from 'react'
import Modal from '../ui/Modal'

export default function Create({id, getDelitos}) {
    const title = "Agregar Delito";
    return (
        <>
            <Modal id={id} title={title} getDelitos={getDelitos}/>
        </>
    )
}
