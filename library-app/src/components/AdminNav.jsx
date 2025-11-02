import React from 'react'
import { useState } from 'react'

import { usePostAddBookMutation } from '../api/bookController';

const AdminNav = () => {

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    authorName: "",
    bio: "",
    email: "",
    isbn: "",
    publishedDate: "",
    genre: "",
    totalCopies: 1,
    bookCoverUrl: "",
  });

   const [addBook] = usePostAddBookMutation();

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBook(formData).unwrap();
      alert("Book added successfully!");
      setIsAddOpen(false);
      setFormData({
        title: "",
        authorName: "",
        bio: "",
        email: "",
        isbn: "",
        publishedDate: "",
        genre: "",
        totalCopies: 1,
        bookCoverUrl: "",
      });
    } catch (error) {
      console.error("Failed to add book:", error);
      alert("Failed to add book.");
    }
  };




  return (
    <div className='adminform'>
        <form action="" className='search-form'>
            <input type="text" placeholder='Search books by title, author, or category...' img=""/>
        </form>

        <button onClick={() => setIsAddOpen(true)}>Add Book</button>

        {isAddOpen && (
        <div className="modal-overlay" onClick={() => setIsAddOpen(false)}>
          <div
            className="add-content"
            onClick={(e) => e.stopPropagation()} // prevent close on inner click
          >
            <h3>Add New Book</h3>
            <form onSubmit={handleSubmit}>
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
              <label>Author</label>
              <input
                type="text"
                name="authorName"
                value={formData.authorName}
                onChange={handleChange}
                required
              />

              <label>Bio</label>
              <input
                type="text"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                required
              />
              <label>Email</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <label>isbn</label>
              <input
                type="text"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                required
              />

              <label>Published Date</label>
              <input
                type="date"
                name="publishedDate"
                value={formData.publishedDate}
                onChange={handleChange}
                required
              />

              <label>Genre</label>
              <input
                type="text"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                required
              />
              
              <label>Total copies</label>
              <input
                type="text"
                name="totalCopies"
                value={formData.totalCopies}
                onChange={handleChange}
                required
              />

              <label>Image URL</label>
              <input
                type="text"
                name="bookCoverUrl"
                value={formData.bookCoverUrl}
                onChange={handleChange}
                required
              />

              <div className="add-buttons">
                <button type="submit">Add</button>
                <button type="button" onClick={() => setIsAddOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminNav