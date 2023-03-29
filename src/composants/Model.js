import React, {useRef} from 'react'
import modal from "bootstrap/js/src/modal";

function Modal({children, showModal, setShowModal}) {
    const modalRef = useRef();
    const closeModal = (e) => {
        if(e.target === modalRef.current){
            setShowModal(false)
        }
    }
    return(
        <div className = 'Modal' ref={modalRef} onClick = {closeModal}>
            <div className="container">
                {children}
            </div>
        </div>
        )
    export default Modal
}