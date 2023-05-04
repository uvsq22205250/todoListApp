import React, { useState } from 'react'
import Modal from './Model';

import { Button, Checkbox, FormControlLabel, Grid,
    makeStyles, Paper, Slide, Snackbar, TextField, Typography } from '@material-ui/core'


function CreateNewTodo(){
    const [showModal, setShowModal] = useState(false) //showModal = false, setShowModal() pour le modifier
    const [text, setText] = useState('') //pour changer la value de l'input
    const [date, setDate] = useState(new Date())
    const [time, setTime] = useState(new Date())

    return(
        <div className="CreateNewToDo">
            <div className='btn_div'>
            <button className='btn btn-primary' onClick={() => setShowModal(true)}>
                New Todo
            </button>
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal}>
               

            </Modal>
        </div>
    )
}
export default CreateNewTodo;