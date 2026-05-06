import React, { useState } from 'react'
import ToDo from './ToDo'

const Form = () => {

    const [ todos, setToDos ] = useState([])
    const [ todo, setTodo ] = useState("")

    const handleClick = ()=>{
        if(todo.trim().length === 0) {
            alert('El campo no debe estar vacio')
            return
        }
        setToDos([...todos, {todo}])
        
    }

    const handleChange = (e)=>{
        let cambio = e.target.value
        setTodo(cambio)
    }

      const deleteTodo = (index)=>{
        const newTodos = [...todos]
        newTodos.splice(index, 1)
        setToDos(newTodos)
      }

    
  return (
    <>
    <form onSubmit={e => e.preventDefault()}>
        <label htmlFor="">Agregar tarea</label>
        <br />
        <input type="text" placeholder='tareas por hacer' name='todo' onChange={handleChange}/>
        <button onClick={handleClick}>Agregar</button>
    </form>
        {
            todos.map((value, index)=>(
                <ToDo todo={value.todo} key={index} index={index} deleteTodo={deleteTodo}/>
            ))
        }
    </>
  )
}

export default Form