import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>ReviewAI</h1>
          <span className="tagline">Умный анализ отзывов</span>
        </div>
        <nav className="nav">
          <ul>
            <li><a href="#home">Главная</a></li>
            <li><a href="#about">О нас</a></li>
            <li><a href="#contact">Контакты</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header; 