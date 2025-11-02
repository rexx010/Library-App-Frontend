import React from 'react'
import { Link } from 'react-router-dom';
import { useGetBorrowedBooksQuery, useReturnBookMutation } from '../../api/borrowBook';

const UserBorrowedBook = () => {

    const {data, isLoading, error, refetch} = useGetBorrowedBooksQuery()
    const [returnBook, { isLoading: returning }] = useReturnBookMutation()
    
        if (isLoading) return <p>Loading books...</p>;
        if (error) return <p>Failed to load books</p>;

        const checkedOutBooks = data?.filter(book => book.status === "CHECKED_OUT")


    const handleReturn = async (bookId) => {
    try {
      await returnBook(bookId).unwrap()
      alert('Book returned successfully!')
      refetch()
    } catch (err) {
      console.error(err)
      alert('Failed to return book.')
    }
  }

  

  return (
    <div>
        <h2>Borrowed Book</h2>

        <div className="usermain">
            {checkedOutBooks && checkedOutBooks.length > 0 ? (
                checkedOutBooks.map((borrow) => {
                    const book = borrow.book
                    if (!book) return null
                    return(


            <div className='books' key={borrow.id}>
                <Link to={`${book.id}`} > <img src={book.bookCoverUrl} alt={book.title} />
                <h4>{book.title}</h4>
                <p>{book.authorName}</p>
                <h5>{book.availableCopies}/{book.totalCopies} available</h5></Link> 
                <div className="bookbutton">
                    <button onClick={() => handleReturn(book.id)}
                disabled={returning}>{returning ? 'Returning...' : 'Return'}</button>
                </div>
            </div>
            )}
            ))  : (
                <p>You have no borrowed books.</p>
            )}
        </div>
    </div>
  )
}

export default UserBorrowedBook