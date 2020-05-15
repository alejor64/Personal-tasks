import React, { useEffect, useState } from 'react'
import {auth} from '../firebase'
import {withRouter} from 'react-router-dom'
import FireStore from './FireStore.jsx'

const Admin = (props) => {

    const [user, setUser] = useState(null)

    useEffect(() => {
        if(auth.currentUser){
            console.log('Usuarío')
            setUser(auth.currentUser)

        } else{
            console.log('NO hay')
            props.history.push('/login')
        }

    }, [props.history])

    return (
        <div>
            <h3><strong>Perfil</strong></h3>
            {
                user && (<FireStore user={user} />)
            }
        </div>
    )
}

export default withRouter(Admin)