import React, { useState } from 'react';
import { Play, Info, Volume2, VolumeX } from 'lucide-react';
import './Hero.css';

function Hero({ movie, onPlay, onInfo }) {
  const [isMuted, setIsMuted] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!movie) {
    return (
      <div className="hero skeleton">
        <div className="hero-gradient" />
      </div>
    );
  }

  const title = movie.title || movie.name;
  const year = movie.release_date || movie.first_air_date
    ? new Date(movie.release_date || movie.first_air_date).getFullYear()
    : '';
  
  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  const overview = movie.overview
    ? movie.overview.length > 150
      ? movie.overview.substring(0, 150) + '...'
      : movie.overview
    : '';

  return (
    <div className="hero">
      {/* Background Image */}
      <div className="hero-background">
        {backdropUrl ? (
          <img
            src={backdropUrl}
            alt={title}
            className={`hero-image ${imageLoaded ? 'loaded' : ''}`}
            onLoad={() => setImageLoaded(true)}
          />
        ) : (
          <div className="hero-fallback" />
        )}
        <div className="hero-gradient" />
        <div className="hero-gradient-left" />
        <div className="hero-gradient-top" />
      </div>

      {/* Content */}
      <div className="hero-content">
        <h1 className="hero-title">{title}</h1>
        
        <div className="hero-meta">
          {year && <span>{year}</span>}
          <span className="rating">
            {movie.vote_average ? `${movie.vote_average.toFixed(1)} Rating` : ''}
          </span>
          {movie.number_of_seasons && (
            <span>{movie.number_of_seasons} Season{movie.number_of_seasons > 1 ? 's' : ''}</span>
          )}
        </div>

        <p className="hero-overview">{overview}</p>

        <div className="hero-buttons">
          <button className="btn btn-play" onClick={onPlay}>
            <Play size={24} fill="black" />
            Play
          </button>
          <button className="btn btn-info" onClick={onInfo}>
            <Info size={24} />
            More Info
          </button>
        </div>
      </div>

      {/* Mute Button */}
      <button 
        className="mute-btn"
        onClick={() => setIsMuted(!isMuted)}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
    </div>
  );
}

export default Hero;
