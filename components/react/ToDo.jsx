const ToDo = ({todo, deleteTodo, index}) => {




  return (
    <div>
        <h1>
          {todo}
          <button onClick={()=>deleteTodo(index)}>Eliminar</button>
        </h1>
    </div>
  )
}

export default ToDo