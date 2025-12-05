// ===================================
// WELCOME PAGE COMPONENT
// ===================================
// Landing page with factory information

import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Welcome = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect admin to admin dashboard on mount
  useEffect(() => {
    if (isAuthenticated && user?.isAdmin) {
      navigate('/admin/orders');
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="welcome-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-icon">🏭</div>
          {user ? (
            <>
              <h1 className="hero-title">Welcome back, <span className="username-gradient">{user.name}</span> ✨</h1>
              <p className="hero-subtitle">Happy shopping — we saved some favourites for you!</p>
            </>
          ) : (
            <>
              <h1 className="hero-title">Welcome to Liya's Factory</h1>
              <p className="hero-subtitle">Premium Snacks Manufacturing & Distribution</p>
            </>
          )}
          <Link to="/shop" className="btn btn-primary hero-button">
            Shop Now →
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-card">
              <div className="about-icon">📦</div>
              <h3>About Liyas Factory</h3>
              <p>
                Liyas Factory is a leading snacks manufacturing company with over 13 years of experience in producing premium quality snacks. 
                We are committed to delivering delicious, healthy, and affordable snacks to consumers across the region using only the finest 
                ingredients and state-of-the-art manufacturing processes.
              </p>
            </div>
            <div className="about-card">
              <div className="about-icon">✨</div>
              <h3>Our Mission</h3>
              <p>
                To create exceptional snacks that bring joy to every household while maintaining the highest standards of quality, 
                hygiene, and sustainability. We believe in continuous innovation and customer satisfaction.
              </p>
            </div>
            <div className="about-card">
              <div className="about-icon">🎯</div>
              <h3>Our Vision</h3>
              <p>
                To become the most trusted and preferred snacks brand in the market by consistently delivering superior quality products 
                and exceptional customer service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '40px', color: '#2d3436' }}>What We Offer</h2>
          <div className="features-grid">
            <Feature 
              icon="🥨" 
              title="Premium Products" 
              desc="Wide range of high-quality snacks manufactured with care"
            />
            <Feature 
              icon="🏢" 
              title="Modern Facilities" 
              desc="State-of-the-art manufacturing equipment and processes"
            />
            <Feature 
              icon="🚚" 
              title="Fast Delivery" 
              desc="Efficient distribution network across the region"
            />
            <Feature 
              icon="✅" 
              title="Quality Assured" 
              desc="Rigorous quality control at every stage"
            />
            <Feature 
              icon="💚" 
              title="Healthy Options" 
              desc="Nutritious snacks with no artificial preservatives"
            />
            <Feature 
              icon="🌍" 
              title="Sustainable" 
              desc="Eco-friendly packaging and production practices"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '40px', color: '#2d3436' }}>Contact Information</h2>
          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-icon">📍</div>
              <h3>Address</h3>
              <p>
                Liya's Factory<br />
                Nagavarpalya<br />
                CV Raman Nagar, Bengaluru - 560093<br />
                India
              </p>
            </div>
            <div className="contact-card">
              <div className="contact-icon">📞</div>
              <h3>Phone</h3>
              <p>
                <strong>Main Office:</strong> +91 9480144010<br />
                <strong>Customer Service:</strong> +91 7411414011<br />
                <strong>Orders:</strong> +91 8310083789<br />
                
              </p>
            </div>
            <div className="contact-card">
              <div className="contact-icon">✉️</div>
              <h3>Email</h3>
              <p>
                <strong>General:</strong> info@liyasfactory.com<br />
                <strong>Sales:</strong> sales@liyasfactory.com<br />
                <strong>Support:</strong> support@liyasfactory.com<br />
                <strong>Orders:</strong> ssreeliya3@gmail.com
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#2d3436' }}>Find Us on the Map</h2>
          <div className="map-container">
            <div className="map-placeholder">
              {/* Google Maps embed using coordinates (output=embed). If this is blocked by your browser/Google policy, open the shortlink below. */}
              <iframe
                title="Liyas Factory Location - Google Maps"
                src="https://www.google.com/maps?q=Nagavarpalya%2C+CV+Raman+Nagar%2C+Bengaluru+560093&z=16&output=embed"
                style={{ border: 0, borderRadius: '8px' }}
                width="100%"
                height="450"
                frameBorder="0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

              <div style={{ marginTop: '12px', textAlign: 'center' }}>
                <a
                  href="https://maps.app.goo.gl/UopTo1ik3DZBgAdUA?g_st=ipc"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: 'var(--primary-color)', fontWeight: 700, textDecoration: 'none' }}
                >
                  Open this location in Google Maps (shortlink)
                </a>
                <div style={{ color: 'var(--text-light)', fontSize: 13, marginTop: 6 }}>
                  If the embedded map is blocked, use the shortlink above to open Google Maps in a new tab.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Working Hours Section */}
     <section className="hours-section">
  <div className="container">
    <h2
      style={{
        textAlign: 'center',
        marginBottom: '40px',
        color: '#2d3436',
        fontSize: '50px'
      }}
    >
      Working Hours
    </h2>

    <div className="hours-grid" style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        className="hours-card"
        style={{
          fontSize: '24px',
          textAlign: 'center',
          padding: '35px', 
          maxWidth: '650px', 
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
      >
        <h3 style={{ fontSize: '32px', marginBottom: '15px' }}>Factory working hours</h3>

        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            fontSize: '150x', // Increased days and timings size to 34px
            textAlign: 'center',
            lineHeight: '2.5'
          }}
        >
          {/* Monday - Friday */}
          <li style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontWeight: 'bold', marginRight: '15px' }}>Monday - Friday:</span>
            <span style={{ marginLeft: '15px' }}>6:00 AM - 9:00 PM</span>
          </li>
          <hr style={{ margin: '0 auto 10px auto', width: '80%', border: '0', borderTop: '1px solid #eee' }} />

          {/* Saturday */}
          <li style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontWeight: 'bold', marginRight: '15px' }}>Saturday:</span>
            <span style={{ marginLeft: '15px' }}>6:00 AM - 9:00 PM</span>
          </li>
          <hr style={{ margin: '0 auto 10px auto', width: '80%', border: '0', borderTop: '1px solid #eee' }} />

          {/* Sunday */}
          <li style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold', marginRight: '15px' }}>Sunday:</span>
            <span style={{ marginLeft: '15px' }}>6:00 AM - 2:00 PM</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Manage Your Factory?</h2>
            <p>Access our management system to track materials, production, inventory, and orders efficiently.</p>
            <Link to="/shop" className="btn btn-primary" style={{ fontSize: '16px', padding: '14px 40px' }}>
              Shop Now →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const Feature = ({ icon, title, desc }) => (
  <div className="feature-card">
    <div className="feature-icon">{icon}</div>
    <h4>{title}</h4>
    <p>{desc}</p>
  </div>
);

export default Welcome;