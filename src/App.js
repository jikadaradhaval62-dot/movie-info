import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MovieRow from './components/MovieRow';
import MovieModal from './components/MovieModal';
import Footer from './components/Footer';
import { useMovies } from './hooks/useMovies';
import './App.css';

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [heroMovie, setHeroMovie] = useState(null);

  // Fetch all movie data
  const { 
    trending, 
    popular, 
    topRated, 
    upcoming, 
    nowPlaying, 
    tvPopular,
    searchResults,
    loading 
  } = useMovies(searchQuery);

  // Set hero movie when trending loads
  useEffect(() => {
    if (trending.length > 0 && !heroMovie) {
      setHeroMovie(trending[0]);
    }
  }, [trending, heroMovie]);

  // Handle search
  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    setIsSearching(query.trim().length > 0);
  }, []);

  // Handle movie click
  const handleMovieClick = useCallback((movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  }, []);

  // Handle modal close
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedMovie(null), 300);
  }, []);

  // Handle play
  const handlePlay = useCallback(() => {
    if (selectedMovie) {
      const title = selectedMovie.title || selectedMovie.name;
      alert(`Playing: ${title}`);
    }
  }, [selectedMovie]);

  return (
    <div className="app">
      <Navbar onSearch={handleSearch} />
      
      <main>
        {!isSearching ? (
          <>
            <Hero 
              movie={heroMovie} 
              onPlay={() => heroMovie && handleMovieClick(heroMovie)}
              onInfo={() => heroMovie && handleMovieClick(heroMovie)}
            />
            
            <div className="movie-rows">
              <MovieRow 
                title="Trending Now" 
                movies={trending} 
                onMovieClick={handleMovieClick}
              />
              <MovieRow 
                title="Popular Movies" 
                movies={popular} 
                onMovieClick={handleMovieClick}
              />
              <MovieRow 
                title="Now Playing" 
                movies={nowPlaying} 
                onMovieClick={handleMovieClick}
              />
              <MovieRow 
                title="Top Rated" 
                movies={topRated} 
                onMovieClick={handleMovieClick}
              />
              <MovieRow 
                title="Coming Soon" 
                movies={upcoming} 
                onMovieClick={handleMovieClick}
              />
              <MovieRow 
                title="Popular TV Shows" 
                movies={tvPopular} 
                onMovieClick={handleMovieClick}
              />
            </div>
          </>
        ) : (
          <div className="search-results">
            <h2>Search Results for "{searchQuery}"</h2>
            {searchResults.length > 0 ? (
              <div className="search-grid">
                {searchResults.map((movie) => (
                  <div 
                    key={movie.id} 
                    className="search-item"
                    onClick={() => handleMovieClick(movie)}
                  >
                    <img 
                      src={movie.poster_path 
                        ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
                        : 'https://via.placeholder.com/342x513?text=No+Image'
                      }
                      alt={movie.title || movie.name}
                    />
                    <p>{movie.title || movie.name}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-results">No results found</p>
            )}
          </div>
        )}
      </main>

      <Footer />
      
      <MovieModal 
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onPlay={handlePlay}
      />
    </div>
  );
}

export default App;
