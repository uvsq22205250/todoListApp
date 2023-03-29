import React from 'react'
import CreateNewProject from './CreateNewProject'
import Projet from "./Projet";
function Projets(){


    return(
        <div className="Projets">
            <CreateNewProject />
            <Projet />
        </div>
    )
}
export default Projets;