import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import 'bootstrap/dist/css/bootstrap.min.css';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  const calculateSubtotal = (item: CartItem) => item.price * item.quantity;
  const total = cart.reduce((sum, item) => sum + calculateSubtotal(item), 0);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Your Cart</h2>

      {cart.length === 0 ? (
        <div className="alert alert-info text-center">
          Your cart is empty.
          <br />
          <br />
          <button
            className="btn btn-outline-primary"
            onClick={() => navigate('/books')}
          >
            Continue Browsing
          </button>
        </div>
      ) : (
        <>
          {/* Responsive Table Wrapper */}
          <div className="table-responsive mb-4">
            <table className="table table-striped table-bordered text-center">
              <thead className="table-dark">
                <tr>
                  <th>Title</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item: CartItem) => (
                  <tr key={item.bookID}>
                    <td>{item.title}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => removeFromCart(item.bookID)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Box */}
          <div className="card mx-auto" style={{ maxWidth: '400px' }}>
            <div className="card-body">
              <ul className="list-group mb-3">
                <li className="list-group-item d-flex justify-content-between">
                  <strong>Total</strong>
                  <span>${total.toFixed(2)}</span>
                </li>
              </ul>
              <div className="d-grid gap-2">
                <button className="btn btn-success">Checkout</button>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => navigate('/books')}
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
