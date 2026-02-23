import React, { useState } from 'react';
import { Play, Plus, ThumbsUp, ChevronDown } from 'lucide-react';
import './MovieCard.css';

function MovieCard({ movie, onClick, isLarge = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const title = movie.title || movie.name;
  const imagePath = isLarge ? movie.poster_path : movie.backdrop_path;
  const imageUrl = imagePath
    ? `https://image.tmdb.org/t/p/${isLarge ? 'w342' : 'w500'}${imagePath}`
    : null;

  const year = movie.release_date || movie.first_air_date
    ? new Date(movie.release_date || movie.first_air_date).getFullYear()
    : '';

  return (
    <div
      className={`movie-card ${isLarge ? 'large' : ''} ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className={`card-image-container ${isLarge ? 'large' : ''}`}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className={`card-image ${imageLoaded ? 'loaded' : ''}`}
            onLoad={() => setImageLoaded(true)}
          />
        ) : (
          <div className="card-fallback">
            <span>No Image</span>
          </div>
        )}

        {isHovered && (
          <div className="card-overlay">
            <Play size={30} fill="white" />
          </div>
        )}
      </div>

      {/* Expanded Info on Hover */}
      {isHovered && (
        <div className="card-expanded">
          <div className="card-actions">
            <button className="action-btn play">
              <Play size={16} fill="black" />
            </button>
            <button className="action-btn">
              <Plus size={16} />
            </button>
            <button className="action-btn">
              <ThumbsUp size={14} />
            </button>
            <button className="action-btn info">
              <ChevronDown size={16} />
            </button>
          </div>

          <div className="card-info">
            <div className="card-meta">
              <span className="match">
                {movie.vote_average ? `${(movie.vote_average * 10).toFixed(0)}% Match` : 'New'}
              </span>
              {year && <span className="year">{year}</span>}
              <span className="hd">HD</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieCard;
