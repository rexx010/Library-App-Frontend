import React from 'react'
import { Link } from 'react-router-dom'
import { useGetAllBooksQuery, useDeleteBookByIdMutation, useUpdateBookMutation } from '../../api/bookController';
import { useState } from 'react';

const Admin = () => {
    const {data, error, isLoading} = useGetAllBooksQuery();
    const [deleteBook] = useDeleteBookByIdMutation();
    const [updateBook] = useUpdateBookMutation();

    const [isEditOpen, setIsEditOpen] = useState(false)
    const [selectedBook, setSelectedBook] = useState(null)
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        availableCopies: '',
        bookCoverUrl: ''
    })

    const handleEditClick = (book) => {
        setSelectedBook(book)
        setFormData({
            title: book.title,
            author: book.author,
            availableCopies: book.availableCopies,
            bookCoverUrl: book.bookCoverUrl
        })
        setIsEditOpen(true)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      await updateBook({ id: selectedBook.id, ...formData }).unwrap()
      alert('Book updated successfully!')
      setIsEditOpen(false)
    } catch (error) {
      console.error('Failed to update book:', error)
      alert('Failed to update book.')
    }
  }



    const handleDelete = async (bookId) => {
        if (window.confirm("Are you sure you want to delete this book?")) {
            try {
                await deleteBook(bookId).unwrap();
                alert("Book deleted successfully.");
            } catch (err) {
                console.error("Failed to delete the book: ", err);
                alert("Failed to delete the book.");
            }
        }
    };

    if (isLoading) return <p>Loading books...</p>;
    if (error) return <p>Failed to load books</p>;
  return (
    <div>
        <div className="usermain">
            {data && data.map((book) => (
                        <div className='books' key={book.id}>
                            <Link to={`${book.id}`} > <img src={book.bookCoverUrl} alt="" />
                            <h4>{book.title}</h4>
                            <p>{book.author}</p>
                            <h5>{book.totalCopies}/{book.availableCopies} available</h5></Link> 
                            <div className="bookbutton">
                                <button onClick={() => handleEditClick(book)}>Edit</button>
                                <button onClick={()=> handleDelete(book.id)}>Delete</button>
                            </div>
                        </div>
                    ))}


        {isEditOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Book</h3>
            <form onSubmit={handleUpdate}>
              <label>Title:</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} />

              <label>Author:</label>
              <input type="text" name="author" value={formData.author} onChange={handleChange} />

              <label>Available Copies:</label>
              <input type="number" name="availableCopies" value={formData.availableCopies} onChange={handleChange} />

              <label>Image URL:</label>
              <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />

              <div className="modal-buttons">
                <button type="submit">Update</button>
                <button type="button" onClick={() => setIsEditOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    
       
        
           {/* <div className='books'>
               
            <div className='books'>
                <img src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1212&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                <h4>Pride and Prejudice</h4>
                <p>Jane Austen</p>
                <h5>4/4 available</h5>
                <div className="bookbutton">
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
            <div className='books'>
                <img src="https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                <h4>Pride and Prejudice</h4>
                <p>Jane Austen</p>
                <h5>4/4 available</h5>
                <div className="bookbutton">
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
            <div className='books'>
                <img src="https://images.unsplash.com/photo-1511108690759-009324a90311?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                <h4>Pride and Prejudice</h4>
                <p>Jane Austen</p>
                <h5>4/4 available</h5>
                <div className="bookbutton">
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
            <div className='books'>
                <img src="https://images.unsplash.com/photo-1621827979802-6d778e161b28?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                <h4>Pride and Prejudice</h4>
                <p>Jane Austen</p>
                <h5>4/4 available</h5>
                <div className="bookbutton">
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
            <div className='books'>
                <img src="https://images.unsplash.com/photo-1716892001560-935f123683f4?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                <h4>Pride and Prejudice</h4>
                <p>Jane Austen</p>
                <h5>4/4 available</h5>
                <div className="bookbutton">
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
            <div className='books'>
                <img src="https://images.unsplash.com/photo-1639690283395-b62444cf9a76?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGJvb2slMjBjb3ZlcnxlbnwwfHwwfHx8MA%3D%3D" alt="" />
                <h4>Pride and Prejudice</h4>
                <p>Jane Austen</p>
                <h5>4/4 available</h5>
                <div className="bookbutton">
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
            <div className='books'>
                <img src="https://images.unsplash.com/photo-1610882648335-ced8fc8fa6b6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fGJvb2slMjBjb3ZlcnxlbnwwfHwwfHx8MA%3D%3D" alt="" />
                <h4>Pride and Prejudice</h4>
                <p>Jane Austen</p>
                <h5>4/4 available</h5>
                <div className="bookbutton">
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
            <div className='books'>
                <img src="https://images.unsplash.com/photo-1722706731906-2163a06f3022?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzF8fGJvb2slMjBjb3ZlcnxlbnwwfHwwfHx8MA%3D%3D" alt="" />
                <h4>Pride and Prejudice</h4>
                <p>Jane Austen</p>
                <h5>4/4 available</h5>
                <div className="bookbutton">
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div> */}
           
        </div>
    </div>
  )
}

export default Admin