import React from 'react'
import { Link } from 'react-router-dom'

const UserNav = () => {
  return (
    <div>
         <form action="" className='search-form'>
            <input type="text" placeholder='Search books by title, author, or category...' img=""/>
        </form>
        <div className="options">
            <Link to={"/user"}><h4>All Books</h4></Link>
            <Link to={"borrowBooks"}><h4>Borrowed (0)</h4></Link>
            <Link to={"reservedBook"}><h4>Reserved (0)</h4></Link>
        </div>
    </div>
  )
}

export default UserNav