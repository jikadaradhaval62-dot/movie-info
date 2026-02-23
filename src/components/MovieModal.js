import React, { useEffect, useState } from 'react';
import { X, Play, Plus, ThumbsUp, Share2, Check } from 'lucide-react';
import './MovieModal.css';

function MovieModal({ movie, isOpen, onClose, onPlay }) {
  const [details, setDetails] = useState(null);
  const [inMyList, setInMyList] = useState(false);

  const title = movie ? (movie.title || movie.name) : '';

  useEffect(() => {
    if (movie && isOpen) {
      const fetchDetails = async () => {
        try {
          const endpoint = movie.title ? 'movie' : 'tv';
          const response = await fetch(
            `http://localhost:5000/api/${endpoint}/${movie.id}`
          );
          const data = await response.json();
          setDetails(data);
        } catch (error) {
          console.error('Error fetching details:', error);
        }
      };
      fetchDetails();
    }
  }, [movie, isOpen]);

  // Get trailer
  const getTrailer = () => {
    if (!details?.videos?.results) return null;
    return details.videos.results.find(
      (video) => video.type === 'Trailer' && video.site === 'YouTube'
    ) || details.videos.results[0];
  };

  const trailer = getTrailer();
  const backdropUrl = movie?.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : null;

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getYear = () => {
    if (!movie) return '';
    const date = movie.release_date || movie.first_air_date;
    return date ? new Date(date).getFullYear() : '';
  };

  const getCastNames = () => {
    if (!details?.credits?.cast) return '';
    return details.credits.cast.slice(0, 5).map((actor) => actor.name).join(', ');
  };

  const getGenres = () => {
    if (!details?.genres) return [];
    return details.genres;
  };

  if (!isOpen || !movie) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        {/* Hero Section */}
        <div className="modal-hero">
          {trailer ? (
            <div className="modal-video">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=0&controls=1&modestbranding=1&rel=0`}
                title="Trailer"
                allowFullScreen
              />
            </div>
          ) : backdropUrl ? (
            <img src={backdropUrl} alt={title} className="modal-backdrop" />
          ) : (
            <div className="modal-backdrop-fallback" />
          )}
          <div className="modal-hero-gradient" />

          {/* Title and Actions */}
          <div className="modal-hero-content">
            <h1 className="modal-title">{title}</h1>
            
            <div className="modal-actions">
              <button className="modal-btn modal-btn-play" onClick={onPlay}>
                <Play size={20} fill="black" />
                Play
              </button>
              
              <button 
                className="modal-btn modal-btn-list"
                onClick={() => setInMyList(!inMyList)}
              >
                {inMyList ? <Check size={20} /> : <Plus size={20} />}
                {inMyList ? 'In My List' : 'My List'}
              </button>
              
              <button className="modal-btn modal-btn-icon">
                <ThumbsUp size={20} />
              </button>
              
              <button className="modal-btn modal-btn-icon">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="modal-details">
          <div className="modal-meta">
            <span className="match">
              {movie.vote_average ? `${(movie.vote_average * 10).toFixed(0)}% Match` : 'New'}
            </span>
            <span className="year">{getYear()}</span>
            {details?.runtime > 0 && (
              <span className="runtime">{formatRuntime(details.runtime)}</span>
            )}
            {details?.number_of_seasons > 0 && (
              <span className="seasons">
                {details.number_of_seasons} Season{details.number_of_seasons > 1 ? 's' : ''}
              </span>
            )}
            <span className="hd-badge">HD</span>
          </div>

          <p className="modal-overview">{movie.overview}</p>

          <div className="modal-info-grid">
            <div>
              <span className="label">Cast:</span>
              <span className="value">{getCastNames() || 'Not available'}</span>
            </div>
            <div>
              <span className="label">Genres:</span>
              <span className="value">
                {getGenres().map((g) => g.name).join(', ') || 'Not available'}
              </span>
            </div>
          </div>
        </div>

        {/* Similar Movies */}
        {details?.similar?.results?.length > 0 && (
          <div className="modal-similar">
            <h3>More Like This</h3>
            <div className="similar-grid">
              {details.similar.results.slice(0, 6).map((item) => (
                <div key={item.id} className="similar-item">
                  <img
                    src={item.poster_path 
                      ? `https://image.tmdb.org/t/p/w342${item.poster_path}`
                      : 'https://via.placeholder.com/342x513?text=No+Image'
                    }
                    alt={item.title || item.name}
                  />
                  <p>{item.title || item.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieModal;
