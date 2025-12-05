import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Cart = () => {
  const { cart, removeFromCart, updateCartItem, clearCart, getCartTotal } = useCart();
  const { token } = useAuth();
  const [showCheckout, setShowCheckout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);

  const [formData, setFormData] = useState({
    customer: {
      name: '',
      email: '',
      phone: '',
    },
    deliveryAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'India',
    },
    paymentMethod: 'Cash on Delivery',
    notes: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');

    if (keys.length === 2) {
      setFormData({
        ...formData,
        [keys[0]]: {
          ...formData[keys[0]],
          [keys[1]]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validateForm = () => {
    const { customer, deliveryAddress } = formData;
    if (!customer.name || !customer.email || !customer.phone) {
      alert('Please fill in all customer details');
      return false;
    }
    if (!deliveryAddress.street || !deliveryAddress.city || !deliveryAddress.state || !deliveryAddress.zipCode) {
      alert('Please fill in complete delivery address');
      return false;
    }
    return true;
  };

  const placeOrder = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      
      // Transform cart items to include snackName for backend
      const itemsForOrder = cart.map((item) => ({
        snackId: item._id,
        snackName: item.name,
        price: item.price,
        quantity: item.quantity,
        packetType: item.packetType,
        subtotal: item.subtotal,
      }));

      console.log('🛒 Cart items being sent:', JSON.stringify(itemsForOrder, null, 2));

      const orderData = {
        items: itemsForOrder,
        customer: formData.customer,
        deliveryAddress: formData.deliveryAddress,
        totalAmount: getCartTotal(),
        paymentMethod: formData.paymentMethod,
        notes: formData.notes,
      };

      const response = await axios.post(
        'http://localhost:5000/api/customer-orders',
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setOrderNumber(response.data.data.orderNumber);
        setOrderPlaced(true);
        clearCart();
      }
    } catch (error) {
      alert('Failed to place order: ' + error.message);
      console.error('Error placing order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="cart-container">
        <div className="order-success">
          <div className="success-icon">✓</div>
          <h1>Order Placed Successfully!</h1>
          <p className="order-number">Order Number: <strong>{orderNumber}</strong></p>
          <p>Thank you for your order. You will receive a confirmation email shortly.</p>
          <p>We'll deliver your snacks soon!</p>
          <div className="success-actions">
            <Link to="/shop" className="btn btn-primary">
              Continue Shopping
            </Link>
            <Link to="/" className="btn btn-secondary">
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>🛒 Your Shopping Cart</h1>
        <p>{cart.length} item(s) in cart</p>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/shop" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-content">
          {/* Cart Items */}
          <div className="cart-items">
            <div className="items-header">
              <h2>Items in Cart</h2>
            </div>

            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.image} alt={item.name} className="item-image" />

                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-packet">Packet: {item.packetType}</p>
                  <p className="item-price">₹{(item.price * item.priceMultiplier).toFixed(2)}</p>
                </div>

                <div className="item-quantity">
                  <button
                    onClick={() =>
                      updateCartItem(item._id, item.packetType, item.quantity - 1)
                    }
                    className="qty-btn"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateCartItem(item._id, item.packetType, item.quantity + 1)
                    }
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>

                <div className="item-subtotal">
                  <p>₹{item.subtotal.toFixed(2)}</p>
                </div>

                <button
                  onClick={() => removeFromCart(item._id, item.packetType)}
                  className="btn-remove"
                >
                  Remove
                </button>
              </div>
            ))}

            {/* Cart Summary */}
            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹{getCartTotal().toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Delivery:</span>
                <span>Free</span>
              </div>
              <div className="summary-row total">
                <span>Total Amount:</span>
                <span>₹{getCartTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Checkout Section */}
          {!showCheckout ? (
            <button
              className="btn btn-primary btn-checkout"
              onClick={() => setShowCheckout(true)}
            >
              Proceed to Checkout
            </button>
          ) : (
            <div className="checkout-form">
              <h2>Checkout Details</h2>

              {/* Customer Details */}
              <div className="form-section">
                <h3>Customer Information</h3>
                <input
                  type="text"
                  name="customer.name"
                  placeholder="Full Name"
                  value={formData.customer.name}
                  onChange={handleInputChange}
                  className="form-input"
                />
                <input
                  type="email"
                  name="customer.email"
                  placeholder="Email Address"
                  value={formData.customer.email}
                  onChange={handleInputChange}
                  className="form-input"
                />
                <input
                  type="tel"
                  name="customer.phone"
                  placeholder="Phone Number"
                  value={formData.customer.phone}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              {/* Delivery Address */}
              <div className="form-section">
                <h3>Delivery Address</h3>
                <input
                  type="text"
                  name="deliveryAddress.street"
                  placeholder="Street Address"
                  value={formData.deliveryAddress.street}
                  onChange={handleInputChange}
                  className="form-input"
                />
                <input
                  type="text"
                  name="deliveryAddress.city"
                  placeholder="City"
                  value={formData.deliveryAddress.city}
                  onChange={handleInputChange}
                  className="form-input"
                />
                <input
                  type="text"
                  name="deliveryAddress.state"
                  placeholder="State"
                  value={formData.deliveryAddress.state}
                  onChange={handleInputChange}
                  className="form-input"
                />
                <input
                  type="text"
                  name="deliveryAddress.zipCode"
                  placeholder="Zip Code"
                  value={formData.deliveryAddress.zipCode}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              {/* Payment & Notes */}
              <div className="form-section">
                <h3>Payment & Notes</h3>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="Cash on Delivery">Cash on Delivery</option>
                  <option value="Card">Credit/Debit Card</option>
                  <option value="UPI">UPI</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
                <textarea
                  name="notes"
                  placeholder="Special instructions (optional)"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="form-input"
                  rows="3"
                />
              </div>

              {/* Order Summary */}
              <div className="order-summary">
                <p><strong>Total Amount: ₹{getCartTotal().toFixed(2)}</strong></p>
                <p className="small-text">Delivery charges: Free</p>
              </div>

              {/* Checkout Buttons */}
              <div className="checkout-buttons">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowCheckout(false)}
                >
                  Back to Cart
                </button>
                <button
                  className="btn btn-primary"
                  onClick={placeOrder}
                  disabled={loading}
                >
                  {loading ? 'Placing Order...' : 'Place Order'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
