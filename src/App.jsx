import React, { useState, useEffect } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Admin from './components/Admin'
import {auth} from './firebase'
import Reset from './components/Reset'
import Front from './components/Front'

function App() {

  const [firebaseUSer, setFirebaseUSer] = useState(false)

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      console.log(user)
      if(user){
        setFirebaseUSer(user)
      } else{
        setFirebaseUSer(null)
      }
    })
  }, [])

  return firebaseUSer !== false ? (
    <Router>
      <div className="container">
        <Navbar firebaseUSer={firebaseUSer} />
        <Switch>
          <Route path="/" exact>
            <Front />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/reset">
            <Reset />
          </Route>
        </Switch>
      </div>
    </Router>
  ) : (<p>Cargando...</p>)
}

export default App;
