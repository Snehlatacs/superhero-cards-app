// src/pages/HeroBlogPage.js
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import heroes from '../heroes';
import './HeroBlogPage.css';

function HeroBlogPage() {
  const { name } = useParams();
  const hero = heroes.find((h) => h.name === name);
  const hasCounted = useRef(false);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [views, setViews] = useState(0);

  useEffect(() => {
    if(!hasCounted.current) {
    const savedViews = localStorage.getItem(`${name}-views`);
    const newViews = savedViews ? parseInt(savedViews) + 1 : 1;
    setViews(newViews);
    localStorage.setItem(`${name}-views`, newViews.toString());
    hasCounted.current = true;
    } 
  }, [name]);

  const handleCommentSubmit = () => {
    if (newComment.trim() === '') return;

    const newCommentObj = {
      text: newComment,
      likes: 0,
      dislikes: 0,
      reactions: {
        fire: 0,
        heart: 0,
        wow: 0,
      },
      timestamp: new Date().toLocaleString(),
    };

    setComments([...comments, newCommentObj]);
    setNewComment('');
  };

  const handleReaction = (index, type) => {
    const updated = [...comments];
    updated[index].reactions[type]++;
    setComments(updated);
  };

  const handleLike = (index) => {
    const updated = [...comments];
    updated[index].likes++;
    setComments(updated);
  };

  const handleDislike = (index) => {
    const updated = [...comments];
    updated[index].dislikes++;
    setComments(updated);
  };

  if (!hero) return <h2 className="hero-blog-page">Hero Not Found 😢</h2>;

  return (
    <div className="hero-blog-page">
      <Link to="/" className="hero-back-link">🔙 Back to Home</Link>
      <h1 className="hero-title">{hero.name}</h1>
      <div className="hero-views">👁️ Views: {views}</div>
      <img src={hero.image} alt={hero.name} className="hero-img" />
      <h3 className="hero-power">Power: {hero.power}</h3>
      <p className="hero-description">
        Welcome to the blog of <strong>{hero.name}</strong>. Write cool stories here! 📝
      </p>

      <div className="comment-section">
        <h2>💬 Comments</h2>
        <textarea
          placeholder="Add your comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="comment-input"
        />
        <button onClick={handleCommentSubmit} className="comment-btn">Post Comment</button>

        {comments.length === 0 && <p>No comments yet. Be the first to comment!</p>}

        <ul className="comment-list">
          {comments.map((comment, index) => (
            <li key={index} className="comment-item animate-comment">
              <p>{comment.text}</p>
              <p className="comment-timestamp">🕒 {comment.timestamp}</p>

              <div className="emoji-reactions">
                <button onClick={() => handleLike(index)}>👍 {comment.likes}</button>
                <button onClick={() => handleDislike(index)}>👎 {comment.dislikes}</button>
                <button onClick={() => handleReaction(index, 'fire')}>🔥 {comment.reactions.fire}</button>
                <button onClick={() => handleReaction(index, 'heart')}>❤️ {comment.reactions.heart}</button>
                <button onClick={() => handleReaction(index, 'wow')}>😮 {comment.reactions.wow}</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HeroBlogPage;
