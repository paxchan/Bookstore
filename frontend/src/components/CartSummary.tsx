import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Badge, Tooltip, OverlayTrigger } from 'react-bootstrap';

const CartSummary = () => {
  const navigate = useNavigate();
  const { cart } = useCart();

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const renderTooltip = (props: any) => (
    <Tooltip id="cart-tooltip" {...props}>
      Total: ${totalAmount.toFixed(2)}
    </Tooltip>
  );

  return (
    <OverlayTrigger placement="bottom" overlay={renderTooltip}>
      <div
        style={{
          position: 'fixed',
          top: '10px',
          right: '20px',
          background: '#f8f9fa',
          padding: '10px 15px',
          borderRadius: '8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          fontSize: '16px',
        }}
        onClick={() => navigate('/cart')}
      >
        <span>
          🛒 <strong>${totalAmount.toFixed(2)}</strong>
          <Badge pill bg="danger" className="ms-2">
            {totalItems}
          </Badge>
        </span>
      </div>
    </OverlayTrigger>
  );
};

export default CartSummary;
