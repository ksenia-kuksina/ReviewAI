import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>ReviewAI</h3>
            <p>Smart platform for review analysis and management</p>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: info@reviewai.com</p>
            <p>Phone: +1 (555) 123-45-67</p>
          </div>
          <div className="footer-section">
            <h4>Social Media</h4>
            <div className="social-links">
              <a href="#" aria-label="Telegram">📱</a>
              <a href="#" aria-label="Twitter">💬</a>
              <a href="#" aria-label="YouTube">📺</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 ReviewAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 