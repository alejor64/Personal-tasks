import React from 'react'
import {db} from '../firebase'
import moment from 'moment'
import 'moment/locale/es'

const FireStore = (props) => {

    const [tareas, setTareas] = React.useState([])
    const [tarea, setTarea] = React.useState('')
    const [modoEdicion, setModoEdicion] = React.useState(false)
    const [id, setId] = React.useState('')
  
  
    React.useEffect(() => {
  
      const obtenerDatos = async () => {
  
        try {
  
          const data = await db.collection(props.user.uid).get()
          const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
          console.log(arrayData)
          setTareas(arrayData)
          
        } catch (error) {
          console.log(error)
        }
  
      }
  
      obtenerDatos()
  
    }, [props.user.uid])
  
    const agregar = async (e) => {
      e.preventDefault()
  
      if(!tarea.trim()){
        console.log('está vacio')
        return
      }
  
      try {
  
        const nuevaTarea = {
          name: tarea,
          fecha: Date.now()
        }
        const data = await db.collection(props.user.uid).add(nuevaTarea)
  
        setTareas([
          ...tareas,
          {...nuevaTarea, id: data.id}
        ])
  
        setTarea('')
        
      } catch (error) {
        console.log(error)
      }
  
      console.log(tarea)
    }
  
    const eliminar = async (id) => {
      try {
        
        await db.collection(props.user.uid).doc(id).delete()
  
        const arrayFiltrado = tareas.filter(item => item.id !== id)
        setTareas(arrayFiltrado)
  
      } catch (error) {
        console.log(error)
      }
    }
  
    const activarEdicion = (item) => {
      setModoEdicion(true)
      setTarea(item.name)
      setId(item.id)
    }
  
    const editar = async (e) => {
      e.preventDefault()
      if(!tarea.trim()){
        console.log('vacio')
        return
      }
      try {
        
        await db.collection(props.user.uid).doc(id).update({
          name: tarea
        })
        const arrayEditado = tareas.map(item => (
          item.id === id ? {id: item.id, fecha: item.fecha, name: tarea} : item
        ))
        setTareas(arrayEditado)
        setModoEdicion(false)
        setTarea('')
        setId('')
      } catch (error) {
        console.log(error)
      }
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    <h4>Lista de tareas</h4>
                    <ul className="list-group">
                        {
                        tareas.map(item => (
                            <li className="list-group-item" key={item.id}>
                            {item.name} - {moment(item.fecha).format('ll')}
                            <button 
                                className="btn-danger btn-sm float-right"
                                onClick={() => eliminar(item.id)}
                            >
                                <i className="material-icons">delete_forever</i>
                            </button>
                            <button 
                                className="btn-warning btn-sm float-right mr-2"
                                onClick={() => activarEdicion(item)}
                            >
                                <i className="material-icons">edit</i>
                            </button>
                            </li>
                        ))
                        }
                    </ul>
                </div>
                <div className="col-md-6">
                    <h4>
                        {
                            modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
                        }
                    </h4>
                    <form onSubmit={modoEdicion ? editar : agregar}>
                        <input 
                        type="text"
                        placeholder="Ingrese tarea"
                        className="form-control mb-2"
                        onChange={e => setTarea(e.target.value)}
                        value={tarea}
                        />
                        <button 
                        className={
                            modoEdicion ? 'btn amber accent-4 btn-block' : 'btn grey darken-3 btn-block'
                        }
                        type="submit"
                        >
                        {
                            modoEdicion ? 'Editar' : 'Agregar'
                        }
                        </button>
                    </form>
                </div>
            </div> 
        </div>
    )
}

export default FireStore