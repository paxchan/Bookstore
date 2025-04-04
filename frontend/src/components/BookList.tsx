import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchBooks } from '../api/BooksAPI';
import Pagination from './Pagination';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch books from API
  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(pageSize, pageNum, selectedCategories);
        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [pageSize, pageNum, selectedCategories]);

  if (loading) return <p>Loading Projects...</p>;
  if (error) return <p className="test-red-500">Error: {error}</p>;

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
      </div>

      {/* Bootstrap Row for Cards */}
      <div className="row">
        {sortBooks(books).map((p) => (
          <div
            id="BookCard"
            className="col-lg-4 col-md-6 col-sm-12 mb-4"
            key={p.bookID}
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
                <button
                  className="btn btn-success"
                  onClick={() =>
                    navigate(`/purchase/${p.title}/${p.bookID}/${p.price}`)
                  }
                >
                  Purchase
                </button>
              </div>
            </div>
          </div>
        ))}
        <Pagination
          currentPage={pageNum}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={setPageNum}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setPageNum(1);
          }}
        />
      </div>
    </div>
  );
}

export default BookList;
