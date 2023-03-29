// import '../User.css';
import React from 'react'
import logo from '../images/task.png'
function User(){


    return(
        <div className="User">
            <div className={logo}>
                <img src={logo} alt="logo" id="profile"/>
            </div>
            <div className = "info">
                <p id="group">Groupe 6</p>
                <a href="#" id="ahref">Se déconnecter</a>
            </div>


        </div>
    )
}
export default User;