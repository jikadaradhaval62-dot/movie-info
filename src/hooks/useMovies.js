import { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:5000/api';

// Helper function for API calls
const fetchAPI = async (endpoint) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  return response.json();
};

export function useMovies(searchQuery = '') {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [tvPopular, setTvPopular] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all movie categories
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [
          trendingRes,
          popularRes,
          topRatedRes,
          upcomingRes,
          nowPlayingRes,
          tvPopularRes
        ] = await Promise.all([
          fetchAPI('/trending/all/week'),
          fetchAPI('/movies/popular'),
          fetchAPI('/movies/top-rated'),
          fetchAPI('/movies/upcoming'),
          fetchAPI('/movies/now-playing'),
          fetchAPI('/tv/popular')
        ]);

        setTrending(trendingRes.results || []);
        setPopular(popularRes.results || []);
        setTopRated(topRatedRes.results || []);
        setUpcoming(upcomingRes.results || []);
        setNowPlaying(nowPlayingRes.results || []);
        setTvPopular(tvPopularRes.results || []);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Search movies
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        const data = await fetchAPI(`/search?query=${encodeURIComponent(searchQuery)}`);
        setSearchResults(data.results || []);
      } catch (error) {
        console.error('Error searching:', error);
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return {
    trending,
    popular,
    topRated,
    upcoming,
    nowPlaying,
    tvPopular,
    searchResults,
    loading
  };
}

export default useMovies;
