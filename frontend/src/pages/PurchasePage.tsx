import { useNavigate, useParams } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { CartItem } from '../types/CartItem';
import 'bootstrap/dist/css/bootstrap.min.css';

function PurchasePage() {
  const navigate = useNavigate();
  const { title, bookId, price } = useParams<{
    title: string;
    bookId: string;
    price: string;
  }>();

  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(1);
  const subtotal = (quantity * Number(price)).toFixed(2);
  const id = Number(bookId);
  const bookPrice = Number(price);

  if (!bookId || isNaN(id) || !price || isNaN(bookPrice)) {
    console.error('Invalid bookId or price:', bookId, price);
    return <div>Error: Invalid purchase link.</div>;
  }

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookID: id,
      title: title || 'No Project Found',
      price: bookPrice,
      quantity,
      subtotal: quantity * bookPrice,
    };

    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <WelcomeBand />
      <div className="container mt-4">
        <div className="card mx-auto" style={{ maxWidth: '500px' }}>
          <div className="card-body text-center">
            <h4 className="card-title mb-3">
              Purchase <strong>{title}</strong>
            </h4>
            <h5 className="card-subtitle mb-4 text-muted">Price: ${price}</h5>

            {/* Quantity Input Group */}
            <div className="input-group mb-3">
              <span className="input-group-text">Quantity</span>
              <input
                type="number"
                className="form-control"
                min="1"
                value={quantity}
                onChange={(x) => setQuantity(Number(x.target.value))}
              />
            </div>

            {/* Subtotal Display */}
            <div className="input-group mb-4">
              <span className="input-group-text">Subtotal</span>
              <input
                type="text"
                className="form-control"
                value={`$${subtotal}`}
                readOnly
              />
            </div>

            {/* Buttons */}
            <div className="d-grid gap-2 mb-2">
              <button className="btn btn-success" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={() => navigate(-1)}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PurchasePage;
