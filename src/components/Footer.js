import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>ReviewAI</h3>
            <p>Умная платформа для анализа и управления отзывами</p>
          </div>
          <div className="footer-section">
            <h4>Контакты</h4>
            <p>Email: info@reviewai.com</p>
            <p>Телефон: +7 (999) 123-45-67</p>
          </div>
          <div className="footer-section">
            <h4>Социальные сети</h4>
            <div className="social-links">
              <a href="#" aria-label="Telegram">📱</a>
              <a href="#" aria-label="VK">💬</a>
              <a href="#" aria-label="YouTube">📺</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 ReviewAI. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 