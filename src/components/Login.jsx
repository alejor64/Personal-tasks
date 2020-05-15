import React from 'react'
import { useState, useCallback } from 'react'
import {auth, db} from '../firebase'
import {withRouter, Link} from 'react-router-dom'

const Login = (props) => {

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [error, setError] = useState(null)
    const [registro, setRegistro] = useState(true)

    const emailInput = (e) => {
        setEmail(e.target.value)
    }
    
    const passInput = (e) => {
        setPass(e.target.value)
    }

    const procesarDatos = (e) => {
        e.preventDefault()
        if(!email.trim()){
            // console.log('Ingrese email')
            setError('Ingrese email')
            return
        }

        if(!pass.trim()){
            // console.log('Ingrese pas')
            setError('Ingrese pas')
            return
        }

        if(pass.length < 6){
            // console.log('Mayor a 6')
            setError('Mayor a 6 caractéres')
            return
        }

        setError(null)

        if(registro){
            registrar()
        } else {
            login()
        }

    }

    const login = useCallback(async () => {

        try {

            const res = await auth.signInWithEmailAndPassword(email, pass)
            console.log(res.user)
            setEmail('')
            setPass('')
            setError(null)

            props.history.push('/admin')

        } catch(err){
            console.log(err)
            if(err.code === 'auth/user-not-found'){
                setError('User not found')
            }
            if(err.code === 'auth/wrong-password'){
                setError('User or Password invalid')
            }
        }

    }, [email, pass, props.history])

    const registrar = useCallback (async () => {

        try {
            const res = await auth.createUserWithEmailAndPassword(email, pass)
            console.log(res.user)
            await db.collection('users').doc(res.user.uid).set({
                email: res.user.email,
                uid: res.user.uid
            })
            await db.collection(res.user.uid).add({
                name: '',
                date: Date.now()
            })
            setEmail('')
            setPass('')
            setError(null)

            props.history.push('/admin')

        } catch(err){
            console.log(err)
            if(err.code === 'auth/invalid-email'){
                setError('Invalid email')
            }
            if(err.code === 'auth/email-already-in-use'){
                setError('The email address is already used')
            }
            
        }

    }, [email, pass, props.history])

    return (
        <div className="section">
            <h3 className="center-align">
                {
                    registro ? 'Registro de usuarios' : 'Login usuario'
                }
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
                        <input
                            type="password"
                            placeholder="Ingrese una constraseña"
                            onChange={passInput}
                            value={pass}
                        >
                        </input>
                        <div>
                        <button 
                            className="btn grey darken-3" 
                            style={{width: '100%', marginTop: '10px'}}
                            type="submit"
                        >
                            { registro ? 'Registrarse' : 'Acceder'}
                            <i className="large material-icons right">
                                {registro ? 'person_add' : 'person'}
                            </i>
                        </button>
                        </div>
                        <div>
                            <button 
                                className="btn" 
                                style={{width: '100%', marginTop: '10px'}}
                                onClick={() => setRegistro(!registro)}
                                type="button"
                            >
                                {registro ? '¿Ya estás registrado?' : '¿No tienes cuenta?'}
                            </button>
                        </div>
                        {
                            !registro ? (
                                <Link to="/reset" onClick={() => props.history.push('/reset')}>
                                    ¿Se te olvidó la contraseña?
                                </Link>
                            ) : null
                        }
                    </form>
                </div>
            </div>
            </div>
        </div>
    )
}

export default withRouter(Login)