import React, { useState } from 'react'
import Modal from './Model';
import { Bell, CalendarDay, X } from 'react-bootstrap-icons';
/*import {DatePicker, TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';*/




function CreateNewToDo(){
    const [showModal, setShowModal] = useState(false) //showModal = false, setShowModal() pour le modifier
    const [text, setText] = useState('') //pour changer la value de l'input
    const [date, setDate] = useState(new Date())

    return(
        <div className="CreateNewToDo">
            <div className='btn_div'>
            <button className='btn btn-primary' onClick={() => setShowModal(true)}>
                New Todo
            </button>
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal}>
                <form>
                    <div className='text'>
                        <header className='headerAddTodo'>
                            <h3>Add new Todo</h3>
                            <div className='cancelAddTodo' onClick={() => setShowModal(false)}>
                                 <X size = '40px'/>
                             </div>
                        </header>
                        <input type='text'
                                value={text}
                                onChange={e => setText(e.target.value)}
                                placeholder='MyTodo...'
                                autoFocus
                        >
                        </input>
                    </div>

                    <div className='WhatDay'>
                        <CalendarDay />
                        <p>choose a day</p>
                        

                    </div>

                    <div className='boutonAddTodo '>
                        <button className='btn btn-primary'>Add Todo</button>
                    </div>
                    

                </form>

            </Modal>
        </div>
    )
}
export default CreateNewToDo;