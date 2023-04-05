import React from 'react'
import Todo from "./Todo";
import NextDays from "./NextDays";
import 'bootstrap/dist/css/bootstrap.css';
function Todos(){

    //Données temporaires
    const todos = [
        {
            id: '1',
            text: "Play league of legend",
            time: "10:00",
            date: "03/04/2023",
            checked: false,
            project: 'personnal'
        },
        {
            id: '2',
            text: "anniversaire de tom",
            time: "21:00",
            date: "10/04/2023",
            checked: false,
            project: 'personnal'

        }
    ]
    const selectedProject = "Today"
    return(
        <div className="Todos">
            <div className='selectedProject'>
                {selectedProject}
            </div>
            <div className='listTodos'>
                {
                todos.map( todo =>
                <Todo todo={todo} />)}
            </div>
            

        </div>
    )
}
export default Todos;