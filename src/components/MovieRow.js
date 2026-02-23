import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';
import './MovieRow.css';

function MovieRow({ title, movies, onMovieClick, isLarge = false }) {
  const rowRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (rowRef.current) {
      const scrollAmount = direction === 'left' 
        ? -rowRef.current.clientWidth * 0.75 
        : rowRef.current.clientWidth * 0.75;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScroll, 300);
    }
  };

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div 
      className="movie-row"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2 className="row-title">
        {title}
        <span className="explore-all">Explore All →</span>
      </h2>

      <div className="row-container">
        {/* Left Arrow */}
        <button
          className={`scroll-btn scroll-left ${isHovered && canScrollLeft ? 'visible' : ''}`}
          onClick={() => scroll('left')}
        >
          <ChevronLeft size={40} />
        </button>

        {/* Movies */}
        <div 
          ref={rowRef}
          className="movies-container"
          onScroll={checkScroll}
        >
          {movies.map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              onClick={() => onMovieClick(movie)}
              isLarge={isLarge}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          className={`scroll-btn scroll-right ${isHovered && canScrollRight ? 'visible' : ''}`}
          onClick={() => scroll('right')}
        >
          <ChevronRight size={40} />
        </button>
      </div>
    </div>
  );
}

export default MovieRow;
