import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import ReviewForm from './components/ReviewForm';
import ReviewList from './components/ReviewList';
import Footer from './components/Footer';

function App() {
  const [reviews, setReviews] = useState([]);

  const addReview = (review) => {
    setReviews([...reviews, { ...review, id: Date.now() }]);
  };

  const deleteReview = (id) => {
    setReviews(reviews.filter(review => review.id !== id));
  };

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <ReviewForm onAddReview={addReview} />
        <ReviewList reviews={reviews} onDeleteReview={deleteReview} />
      </main>
      <Footer />
    </div>
  );
}

export default App; 