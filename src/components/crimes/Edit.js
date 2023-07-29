import React, { useEffect, useState } from 'react'
import Modal from '../ui/Modal';

import { getById } from '../../services/private/DelitoService'

export default function Edit({ idModal, idDelito, getDelitos }) {
    const title = "Editar Delito";

    const [delito, setDelito] = useState({});

    useEffect(() => {
        async function getDelito() {
            if (idDelito !== 0) {
                await getById(idDelito)
                    .then((res) => {
                        console.log(res.data);
                        const data = res?.data;
                        setTimeout(() => {
                            console.log(data)
                            setDelito(data)
                        }, 1000)
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        }   
        getDelito();

        
    }, [idDelito])

    return (
        <>
            <Modal delito={delito} id={idModal} title={title} getDelitos={getDelitos} />
        </>
    )
}
