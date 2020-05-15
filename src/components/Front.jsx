import React from 'react'
import { Link } from 'react-router-dom'

const Front = () => {
    return (
        <div className="section center align">
            <div className="card-panel">
                <h5><strong>Bienvenido a <i>Personal Tasks Apps</i></strong></h5>
                <hr/>
                <h6><strong>Descripción de la App</strong></h6>
                <div className="row">
                    <div className="col s4 card-panel">
                        <br/>
                        <p><strong>Descripción del funcionamiento</strong></p>
                        <p className="text-justify">
                            Ve a la sección de <Link to="/login">Login</Link>, registra un correo y crea 
                            contraseña (No la olvides). Si ya tienes una cuenta creada accede dando click
                            en el botón <i>¿Ya estás registrado?</i>. <br/>
                            Una vez te hayas logueado entrarás al perfil de <i>admin</i> y encontrarás una 
                            sección de tareas donde encontrarás una ya creada por defecto con la fecha en 
                            la cuál ingresaste (La puedes borrar o editar). <br/>
                            Agrega tareas nuevas, editalas o borralas unas vez las hayas completado, sólo
                            tú las podrás ver. ¡Disfrutala!
                        </p>
                    </div>
                
                    <div className="col s4 card-panel">
                        <br/>
                        <p><strong>Descripción de las tecnologías</strong></p>
                        <p className="text-justify">
                            La aplicación consta de Crear, Editar, Leer y Actualizar (<i>CRUD</i>) tareas 
                            personales. La aplicación está enlazada con la base de datos NoSQL <a href="https://firebase.google.com/">Firebase</a> donde
                             se guarda la información de los usuarios registrados y las tareas creadas.<br/>
                            La aplicación se creó con la ayuda de <a href="https://es.reactjs.org/">React</a> usando 
                            diferentes componentes. Para tener una mayor fluidez en la aplicación se usó <a href="https://es.reactjs.org/">React Router</a> con 
                            sus componentes como Link, BrowserRouter, withRouter y Route. Además se usaron Frameworks 
                            de estilos como <a href="https://getbootstrap.com/">Bootstrap</a> y <a href="https://materializecss.com/">Materialize</a>
                        </p>
                    </div>
                </div>
                <img src="logo192.png" alt=""/>
                <img src="firebase.png" alt=""/>
            </div>
        </div>
    )
}

export default Front