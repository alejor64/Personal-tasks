import React, {useState, useCallback} from 'react'
import { auth } from '../firebase'
import {withRouter} from 'react-router-dom'


const Reset = (props) => {

    const [email, setEmail] = useState('')
    const [error, setError] = useState(null)

    const emailInput = (e) => {
        setEmail(e.target.value)
    }

    const procesarDatos = (e) => {
        e.preventDefault()
        if(!email.trim()){
            // console.log('Ingrese email')
            setError('Ingrese email')
            return
        }

        setError(null)
        recuperar()

    }

    const recuperar = useCallback(async () => {
        try {

            await auth.sendPasswordResetEmail(email)
            console.log('correo enviado')
            props.history.push('login')

        } catch(err){
            console.log(err.message)
            if(err.code === 'auth/user-not-found'){
                setError('User not found')
            }
            if(err.code === 'auth/invalid-email'){
                setError('Invalid email')
            }
        }
    }, [email, props.history])


    return (
        <div className="section">
            <h3 className="center-align">
                Recuperar contraseña
            </h3>
            <hr/>
            <div className="container center">
            <div className="row">
                <div className="col s12 offset-m2 m8 l-4">
                    <form className="card-panel" onSubmit={procesarDatos}>
                        {
                            error && (
                                <button className="waves-effect waves-light btn col s12 red lighten-1">{error}</button>
                            )
                        }
                        <input
                            type="email"
                            placeholder="Ingrese un email"
                            onChange={emailInput}
                            value={email}
                        >
                        </input>
                        <div>
                            <button 
                                className="btn grey darken-3" 
                                style={{width: '100%', marginTop: '10px'}}
                                type="submit"
                            >
                                Recuperar contraseña <i className="material-icons right">restore</i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        </div>
    )
}

export default withRouter(Reset)