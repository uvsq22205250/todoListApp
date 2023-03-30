import React, { useState } from 'react'
import Modal from './Model';

function CreateNewToDo(){
    const [showModal, setShowModal] = useState(false) //showModal = false, setShowModal() pour le modifier

    return(
        <div className="CreateNewToDo">
            <div className='btn_div'>
            <button className='btn btn-primary' onClick={() => setShowModal(true)}>
                New Todo
            </button>
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal}>
                <div>
                    Fenetre Ouverte !
                </div>

            </Modal>
        </div>
    )
}
export default CreateNewToDo;