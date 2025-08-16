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
        <h2>Add Review</h2>
        <form className="review-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="rating">Rating:</label>
            <select
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
            >
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Good</option>
              <option value="3">3 - Satisfactory</option>
              <option value="2">2 - Poor</option>
              <option value="1">1 - Very Poor</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="comment">Comment:</label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              required
              placeholder="Write your review"
              rows="4"
            />
          </div>
          
          <button type="submit" className="submit-btn">
            Submit Review
          </button>
        </form>
      </div>
    </section>
  );
}

export default ReviewForm; 