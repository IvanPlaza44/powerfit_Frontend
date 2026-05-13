import React, { useEffect, useState } from 'react'
import  styles  from './ExampleComponent.module.css'

const ExampleComponent = () => {

    const [ count, setCount ] = useState(0);


    useEffect(()=>{
        document.title = `Contador: ${count}`
    }, [count])





  return (
    <div className='bg-green-700 flex justify-center items-colunm'>
        <p className={styles.title} > Contador {count}</p>
        <button onClick={()=>{setCount(count+1)}}>Incrementar</button>
    </div>
    
  )
}

export default ExampleComponent