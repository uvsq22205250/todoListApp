import React, { useState } from 'react'
import Modal from './Model';
import {Clock, Bell, CalendarDay, X } from 'react-bootstrap-icons';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers';
import { StaticTimePicker } from '@mui/x-date-pickers';






function CreateNewToDo(){
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
                    <div className='title'>
                    <CalendarDay />
                    <p>choose a day</p>
                    </div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}> 
                         <DatePicker 
                            value = {date}
                            onChange={date => setDate(date)} />
                    </LocalizationProvider>
                    </div>

                    <div className='WhatTime'>
                    
                    <div className='title'>
                    <Clock />
                    <p>choose a time</p>
                    </div>
                    
                    <LocalizationProvider dateAdapter={AdapterDateFns}> 
                         <TimePicker 
                           value = {time}
                           onChange={time => setTime(time)} />
                    </LocalizationProvider>
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