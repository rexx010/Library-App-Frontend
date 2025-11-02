import React from 'react'
import { Link } from 'react-router-dom'
import { useGetAllBooksQuery } from '../../api/bookController'
import { usePostReserveBookMutation } from '../../api/bookReserve'
import { usePostBorrowBookMutation } from '../../api/borrowBook'

const User = () => {

    const {data, isLoading, error, refetch } = useGetAllBooksQuery()
    const [reserveBook] = usePostReserveBookMutation()
    const [borrowBook, {isLoading: borrowing}] = usePostBorrowBookMutation()

    if (isLoading) return <p>Loading books...</p>;
    if (error) return <p>Failed to load books</p>;

    const handleReservation = async (bookId) => {
    try {
      const response = await reserveBook(bookId).unwrap();
      alert("Book reserved successfully!");
      console.log(response);
    } catch (err) {
      console.error("Failed to reserve book:", err);
      alert("Failed to reserve this book. Maybe you’re not logged in.");
    }
  };

    const handleBorrow = async (bookId) => {
        try {
        const response = await borrowBook(bookId).unwrap()
        console.log('Book borrowed successfully:', response)
        alert('Book borrowed successfully!')
        refetch()
        } catch (error) {
        console.error('Error borrowing book:', error)
        alert('Failed to borrow book')
        }
    }


  return (
    <div className="usermain">
        {data && data.map((book) => (
            <div className='books' key={book.id}>
                <Link to={`${book.id}`} > <img src={book.bookCoverUrl} alt={book.title} />
                <h4>{book.title}</h4>
                <p>{book.author}</p>
                <h5>{book.availableCopies}/{book.totalCopies} available</h5></Link> 
                <div className="bookbutton">
                    <button onClick={() => handleBorrow(book.id)} disabled={borrowing}>{borrowing ? 'Borrowing...' : 'Borrow'}</button>
                    <button onClick={() => handleReservation(book.id)}>Reserve</button>
                </div>
            </div>
        ))}
        
            
               
            {/* <div className="usermain">
            {data && data.map((book) => (
            <div key={book.id} className="books">
                <Link to={`${book.id}`}>
                <img src={book.imageUrl} alt={book.title} />
                <h4>{book.title}</h4>
                <p>{book.author}</p>
                <h5>{book.availableCopies}/4 available</h5>
                </Link>
            </div>
             ))}    
                
            
            <div className='books'>
               
            <div className='books'>
                <img src="https://images.unsplash.com/photo-1511108690759-009324a90311?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                <h4>Pride and Prejudice</h4>
                <p>Jane Austen</p>
                <h5>4/4 available</h5>
                <div className="bookbutton">
                    <button>Borrow</button>
                    <button>Reserve</button>
                </div>
            </div>
            <div className='books'>
                <img src="https://images.unsplash.com/photo-1621827979802-6d778e161b28?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                <h4>Pride and Prejudice</h4>
                <p>Jane Austen</p>
                <h5>4/4 available</h5>
                <div className="bookbutton">
                    <button>Borrow</button>
                    <button>Reserve</button>
                </div>
            </div>
            <div className='books'>
                <img src="https://images.unsplash.com/photo-1716892001560-935f123683f4?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                <h4>Pride and Prejudice</h4>
                <p>Jane Austen</p>
                <h5>4/4 available</h5>
                <div className="bookbutton">
                    <button>Borrow</button>
                    <button>Reserve</button>
                </div>
            </div>
            <div className='books'>
                <img src="https://images.unsplash.com/photo-1639690283395-b62444cf9a76?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGJvb2slMjBjb3ZlcnxlbnwwfHwwfHx8MA%3D%3D" alt="" />
                <h4>Pride and Prejudice</h4>
                <p>Jane Austen</p>
                <h5>4/4 available</h5>
                <div className="bookbutton">
                    <button>Borrow</button>
                    <button>Reserve</button>
                </div>
            </div>
            <div className='books'>
                <img src="https://images.unsplash.com/photo-1610882648335-ced8fc8fa6b6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fGJvb2slMjBjb3ZlcnxlbnwwfHwwfHx8MA%3D%3D" alt="" />
                <h4>Pride and Prejudice</h4>
                <p>Jane Austen</p>
                <h5>4/4 available</h5>
                <div className="bookbutton">
                    <button>Borrow</button>
                    <button>Reserve</button>
                </div>
            </div>
            <div className='books'>
                <img src="https://images.unsplash.com/photo-1722706731906-2163a06f3022?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzF8fGJvb2slMjBjb3ZlcnxlbnwwfHwwfHx8MA%3D%3D" alt="" />
                <h4>Pride and Prejudice</h4>
                <p>Jane Austen</p>
                <h5>4/4 available</h5>
                <div className="bookbutton">
                    <button>Borrow</button>
                    <button>Reserve</button>
                </div>
            </div>
           
        </div> */}
    </div>
  )
}

export default User