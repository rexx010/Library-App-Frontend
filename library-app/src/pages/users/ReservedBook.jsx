import React from 'react'
import { Link } from 'react-router-dom'
import { usePostCancelReservationMutation, useGetReservationsByUserQuery } from '../../api/bookReserve'
import { usePostBorrowBookMutation } from '../../api/borrowBook'

const ReservedBook = () => {

    const {data, isLoading, error, refetch} = useGetReservationsByUserQuery()
    const [cancelBookReservation] = usePostCancelReservationMutation()
    const [borrowBook, {isLoading: borrowing}] = usePostBorrowBookMutation()
    
    const activeReservations = data?.filter((reservation) => reservation.status === "ACTIVE")

    
    console.log(data);
    
    if (isLoading) return <p>Loading books...</p>;
    if (error) return <p>Failed to load books</p>;
    
    const handleCancel = async (bookId) => {
    try {
      const response = await cancelBookReservation(bookId).unwrap();
      console.log("Canceled successfully:", response);
      alert("Reservation canceled!");
      refetch();
    } catch (error) {
      console.error("Error canceling reservation:", error);
      alert("Failed to cancel reservation");
    }
};

const handleBorrow = async (bookId) => {
        try {
        const response = await borrowBook(bookId).unwrap()
        console.log('Book borrowed successfully:', response)
        alert('Book borrowed successfully!')
        await cancelBookReservation(bookId).unwrap();
        refetch()
        } catch (error) {
        console.error('Error borrowing book:', error)
        alert('Failed to borrow book')
        }
    }


  return (
    <div>
        <h2>Reserved Book</h2>

           <div className="usermain">
            {activeReservations && activeReservations.length > 0 ? (
          activeReservations.map((reservation) => {
            const book = reservation.book
            if (!book) return null
          return (
                <div className='books' key={book.id}>
                    <Link to={`${book.id}`} > <img src={book.bookCoverUrl} alt={book.title} />
                    <h4>{book.title}</h4>
                    <p>{book.authorName}</p>
                    <h5>{book.availableCopies}/{book.totalCopies} available</h5></Link> 
                    <div className="bookbutton">
                        <button onClick={() => handleCancel(book.id)}>Cancel</button>
                        <button onClick={() => handleBorrow(book.id)}disabled={borrowing}>
                  {borrowing ? 'Borrowing...' : 'Borrow'}</button>
                    </div>
                </div>
            )})
            ) : (
                <p>You have no reserved books.</p>
            )}
            
                
                
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
                    <img src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1212&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                    <h4>Pride and Prejudice</h4>
                    <p>Jane Austen</p>
                    <h5>4/4 available</h5>
                    <div className="bookbutton">
                        <button>Borrow</button>
                        <button>Reserve</button>
                    </div>
                </div>
                <div className='books'>
                    <img src="https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                    <h4>Pride and Prejudice</h4>
                    <p>Jane Austen</p>
                    <h5>4/4 available</h5>
                    <div className="bookbutton">
                        <button>Borrow</button>
                        <button>Reserve</button>
                    </div>
                </div>
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
    </div>
  )
}

export default ReservedBook