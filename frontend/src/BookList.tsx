import { useEffect, useState } from 'react';
import { Book } from './types/Book';
import 'bootstrap/dist/css/bootstrap.min.css';

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Fetch books from API
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        `https://localhost:5000/Bookstore/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}`
      );
      const data = await response.json();
      setBooks(data.books);
      setTotalItems(data.totalNumBooks);
      setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
    };

    fetchBooks();
  }, [pageSize, pageNum]);

  // Sort books based on title
  const sortBooks = (books: Book[]) => {
    return books.slice().sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Bookstore</h1>

      {/* Sort Button */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <button
          className="btn btn-secondary mb-3"
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          Sort by Project Name ({sortOrder === 'asc' ? 'A-Z' : 'Z-A'})
        </button>

        <label>
          Results per page:
          <select
            value={pageSize}
            onChange={(p) => {
              setPageSize(Number(p.target.value));
              setPageNum(1);
            }}
            style={{ marginLeft: '10px', padding: '5px' }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </label>
      </div>

      {/* Bootstrap Row for Cards */}
      <div className="row">
        {sortBooks(books).map((p) => (
          <div
            id="BookCard"
            className="col-lg-4 col-md-6 col-sm-12 mb-4"
            key={p.bookId}
          >
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title">{p.title}</h3>
                <ul className="list-unstyled">
                  <li>
                    <strong>Author:</strong> {p.author}
                  </li>
                  <li>
                    <strong>Publisher:</strong> {p.publisher}
                  </li>
                  <li>
                    <strong>ISBN:</strong> {p.isbn}
                  </li>
                  <li>
                    <strong>Classification:</strong> {p.classification}
                  </li>
                  <li>
                    <strong>Category:</strong> {p.category}
                  </li>
                  <li>
                    <strong>Number of Pages:</strong> {p.pageCount}
                  </li>
                  <li>
                    <strong>Price:</strong> ${p.price}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="mt-4">
        <button
          className="btn btn-outline-secondary me-2"
          disabled={pageNum === 1}
          onClick={() => setPageNum(pageNum - 1)}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            className={`btn btn-outline-secondary me-2 ${
              pageNum === i + 1 ? 'active' : ''
            }`}
            onClick={() => setPageNum(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="btn btn-outline-secondary"
          disabled={pageNum === totalPages}
          onClick={() => setPageNum(pageNum + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default BookList;
