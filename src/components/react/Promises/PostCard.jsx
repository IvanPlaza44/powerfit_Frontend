import React from 'react'

const PostCard = ({ id, title, body }) => {
    // este es mi componente hijo

  return (
    <div>
        <p>PostCard</p>

        <h4>{id}</h4>
        <h3>{title}</h3>
        <p>{body}</p>

        
    </div>
  )
}

export default PostCard