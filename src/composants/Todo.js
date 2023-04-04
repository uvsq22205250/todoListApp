import React, { useState } from 'react'
import { CheckCircleFill, Circle } from 'react-bootstrap-icons';
import { Trash } from 'react-bootstrap-icons';

function Todo({todo}){
    const [hover, setHover] = useState(false); //state qui définit si la sourit est dessus ou pas 

    function checkTodo(todo) {
        todo.checked = true;
    }
    
    return(
        <div className="todo">
            <div className='todo-container'
            onMouseEnter = {() => setHover(true)}
            onMouseLeave = {() => setHover(false)}
            >
                
                <div className='todo-items'
                onClick={() => {checkTodo(todo)
                                setHover(false)}}>
                    <div className='check-todo'>
                        {
                             todo.checked ?
                             <span className='checked'>
                            <CheckCircleFill color='#bebebe' />
                             </span>
                            :
                            <span className='unChecked' >
                                <Circle color='black' />
                            </span>
                         }
                    </div>

                    <div className='todo-text'>
                        <p>{todo.text}</p>
                        <span>{todo.time} - {todo.project}</span>
                        <div className={`line ${todo.checked ? 'line-checked' : ''}`}> </div>
                     </div>
                </div>

                <div className='todo-action'>
                    <div className='trashIcon'>
                         {
                             (hover || todo.checked) &&
                             <span>
                                <Trash />
                            </span>
                         }
                    </div>
                </div>
                
                
            </div>
            

        </div>
    )
}
export default Todo;