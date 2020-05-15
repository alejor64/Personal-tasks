import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {auth} from '../firebase'

const Navbar = (props) => {

    const cerrarSesion = () => {
        auth.signOut()
            .then(()=>{
                props.history.push("/login")
            })
    }

    return (
        <nav className="grey darken-3">
            <div className="nav-wrapper container">
                <Link className="brand-logo left" to="/">Auth</Link>
                <ul className="right">
                    <li><Link to="/">Inicio</Link></li>
                    {
                        props.firebaseUSer !== null ? (
                            <li><Link to="/admin">Admin</Link></li>
                        ) : null
                    }
                    {
                        props.firebaseUSer !== null ? (
                            <li onClick={()=> cerrarSesion()}>
                                <Link to="">Cerrar Sesión</Link>
                            </li>
                        ) : (
                            <li><Link to="/login">Login</Link></li>
                        )
                    }
                </ul>
            </div>
        </nav>
    )
}

export default withRouter(Navbar)