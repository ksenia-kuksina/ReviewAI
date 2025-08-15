import React, { useState } from 'react';
import './ReviewForm.css';

function ReviewForm({ onAddReview }) {
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    comment: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() && formData.comment.trim()) {
      onAddReview(formData);
      setFormData({ name: '', rating: 5, comment: '' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value
    }));
  };

  return (
    <section className="review-form-section">
      <div className="container">
        <h2>Добавить отзыв</h2>
        <form className="review-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Ваше имя:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Введите ваше имя"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="rating">Оценка:</label>
            <select
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
            >
              <option value="5">5 - Отлично</option>
              <option value="4">4 - Хорошо</option>
              <option value="3">3 - Удовлетворительно</option>
              <option value="2">2 - Плохо</option>
              <option value="1">1 - Очень плохо</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="comment">Комментарий:</label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              required
              placeholder="Напишите ваш отзыв"
              rows="4"
            />
          </div>
          
          <button type="submit" className="submit-btn">
            Отправить отзыв
          </button>
        </form>
      </div>
    </section>
  );
}

export default ReviewForm; 