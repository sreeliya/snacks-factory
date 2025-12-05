import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Shop = () => {
  const [snacks, setSnacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSnack, setSelectedSnack] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedPacket, setSelectedPacket] = useState('Small');
  const { addToCart, getCartItemsCount } = useCart();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchSnacks();
  }, []);

  const fetchSnacks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/snacks');
      if (response.data.success) {
        setSnacks(response.data.data);
      }
    } catch (err) {
      setError('Failed to load snacks. Please try again later.');
      console.error('Error fetching snacks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (snack) => {
    setSelectedSnack(snack);
    setQuantity(1);
    setSelectedPacket(snack.packetTypes[0]?.size || 'Small');
  };

  const confirmAddToCart = () => {
    if (selectedSnack) {
      addToCart(selectedSnack, quantity, selectedPacket);
      setSelectedSnack(null);
      alert('✓ Added to cart!');
    }
  };

  const getPacketPrice = (snack) => {
    const packet = snack.packetTypes.find((p) => p.size === selectedPacket);
    const multiplier = packet?.priceMultiplier || 1;
    return (snack.price * multiplier).toFixed(2);
  };

  if (loading) {
    return (
      <div className="shop-container">
        <div className="loading">
          <p>Loading snacks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="shop-container">
      <div className="shop-header">
        <div className="header-content">
          {user ? (
            <>
              <h1>🛒 Welcome back, <span className="username-gradient">{user.name}</span>!</h1>
              <p>Happy shopping — we've curated some favourites for you.</p>
            </>
          ) : (
            <>
              <h1>🛒 Our Snacks Shop</h1>
              <p>Browse and order delicious snacks from Liya's Factory</p>
            </>
          )}
          <div className="cart-badge" onClick={() => navigate('/cart')}>
            Cart ({getCartItemsCount()})
          </div>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="snacks-grid">
        {snacks.length > 0 ? (
          snacks.map((snack) => (
            <div key={snack._id} className="snack-card">
              <div className="snack-image">
                <img src={snack.image} alt={snack.name} />
                <span className="category-badge">{snack.category}</span>
              </div>

              <div className="snack-content">
                <h3>{snack.name}</h3>
                <p className="snack-description">{snack.description}</p>

                <div className="snack-rating">
                  <span className="stars">⭐ {snack.rating}</span>
                </div>

                <div className="snack-price">
                  <span className="price-label">From: </span>
                  <span className="price">₹{snack.price}</span>
                </div>

                <button
                  className="btn btn-primary btn-add-to-cart"
                  onClick={() => handleAddToCart(snack)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-snacks">
            <p>No snacks available at the moment</p>
          </div>
        )}
      </div>

      {/* Modal for selecting quantity and packet type */}
      {selectedSnack && (
        <div className="modal-overlay" onClick={() => setSelectedSnack(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Select Options</h2>
              <button
                className="modal-close"
                onClick={() => setSelectedSnack(null)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="product-preview">
                <img src={selectedSnack.image} alt={selectedSnack.name} />
                <div>
                  <h3>{selectedSnack.name}</h3>
                  <p>{selectedSnack.description}</p>
                </div>
              </div>

              {/* Ingredients Section */}
              {selectedSnack.ingredients && selectedSnack.ingredients.length > 0 && (
                <div className="ingredients-section">
                  <label><strong>Ingredients:</strong></label>
                  <div className="ingredients-list">
                    {selectedSnack.ingredients.map((ingredient, idx) => (
                      <span key={idx} className="ingredient-tag">{ingredient}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Packet Type Selection */}
              <div className="form-group">
                <label>Select Packet Size:</label>
                <div className="packet-options">
                  {selectedSnack.packetTypes.map((packet, idx) => (
                    <button
                      key={idx}
                      className={`packet-btn ${
                        selectedPacket === packet.size ? 'active' : ''
                      }`}
                      onClick={() => setSelectedPacket(packet.size)}
                    >
                      <div className="packet-size">{packet.size}</div>
                      <div className="packet-weight">{packet.weight}</div>
                      <div className="packet-price">
                        ₹{(selectedSnack.price * packet.priceMultiplier).toFixed(2)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selection */}
              <div className="form-group">
                <label>Quantity:</label>
                <div className="quantity-selector">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="qty-btn"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="qty-input"
                    min="1"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total Price */}
              <div className="price-summary">
                <div className="price-row">
                  <span>Unit Price:</span>
                  <span>₹{getPacketPrice(selectedSnack)}</span>
                </div>
                <div className="price-row">
                  <span>Quantity:</span>
                  <span>{quantity}</span>
                </div>
                <div className="price-row total">
                  <span>Total:</span>
                  <span>₹{(getPacketPrice(selectedSnack) * quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setSelectedSnack(null)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={confirmAddToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
