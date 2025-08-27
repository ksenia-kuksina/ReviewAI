import React from 'react';
import './ReviewList.css';

function ReviewList({ reviews, onDeleteReview }) {
  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  if (reviews.length === 0) {
    return (
      <section className="review-list-section">
        <div className="container">
          <h2>Reviews</h2>
          <div className="no-reviews">
            <p>No reviews yet. Be the first!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="review-list-section">
      <div className="container">
        <h2>Reviews ({reviews.length})</h2>
        <div className="reviews-grid">
          {reviews.map(review => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <h3 className="reviewer-name">{review.name}</h3>
                <div className="rating">
                  {renderStars(review.rating)}
                </div>
              </div>
              <p className="review-comment">{review.comment}</p>
              <div className="review-footer">
                <span className="review-date">
                  {new Date(review.id).toLocaleDateString('en-US')}
                </span>
                <button
                  className="delete-btn"
                  onClick={() => onDeleteReview(review.id)}
                  aria-label="Delete review"
                >
                  
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ReviewList; 