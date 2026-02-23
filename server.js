const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// TMDB API Configuration
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.TMDB_API_KEY || '';

// Middleware
app.use(cors());
app.use(express.json());

// TMDB API Helper Function
const fetchFromTMDB = async (endpoint, params = {}) => {
  try {
    console.log(`Fetching: ${TMDB_BASE_URL}${endpoint}`);
    const response = await axios.get(`${TMDB_BASE_URL}${endpoint}`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'en-US',
        ...params
      }
    });
    return response.data;
  } catch (error) {
    console.error('TMDB API Error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
    throw error;
  }
};

// ========== API ROUTES ==========

// Get trending movies/tv shows
app.get('/api/trending/:type/:timeWindow', async (req, res) => {
  try {
    const { type, timeWindow } = req.params;
    const data = await fetchFromTMDB(`/trending/${type}/${timeWindow}`);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trending content' });
  }
});

// Get popular movies
app.get('/api/movies/popular', async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const data = await fetchFromTMDB('/movie/popular', { page });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch popular movies' });
  }
});

// Get top rated movies
app.get('/api/movies/top-rated', async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const data = await fetchFromTMDB('/movie/top_rated', { page });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch top rated movies' });
  }
});

// Get upcoming movies
app.get('/api/movies/upcoming', async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const data = await fetchFromTMDB('/movie/upcoming', { page });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch upcoming movies' });
  }
});

// Get now playing movies
app.get('/api/movies/now-playing', async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const data = await fetchFromTMDB('/movie/now_playing', { page });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch now playing movies' });
  }
});

// Get movie details
app.get('/api/movie/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(`/movie/${id}`, {
      append_to_response: 'videos,credits,similar'
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movie details' });
  }
});

// Get TV show details
app.get('/api/tv/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(`/tv/${id}`, {
      append_to_response: 'videos,credits,similar'
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch TV show details' });
  }
});

// Get popular TV shows
app.get('/api/tv/popular', async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const data = await fetchFromTMDB('/tv/popular', { page });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch popular TV shows' });
  }
});

// Get top rated TV shows
app.get('/api/tv/top-rated', async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const data = await fetchFromTMDB('/tv/top_rated', { page });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch top rated TV shows' });
  }
});

// Search movies and TV shows
app.get('/api/search', async (req, res) => {
  try {
    const { query, page = 1 } = req.query;
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }
    const data = await fetchFromTMDB('/search/multi', { query, page });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search content' });
  }
});

// Get movie genres
app.get('/api/genres/movie', async (req, res) => {
  try {
    const data = await fetchFromTMDB('/genre/movie/list');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movie genres' });
  }
});

// Get TV genres
app.get('/api/genres/tv', async (req, res) => {
  try {
    const data = await fetchFromTMDB('/genre/tv/list');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch TV genres' });
  }
});

// Discover movies by genre
app.get('/api/discover/movie', async (req, res) => {
  try {
    const { with_genres, page = 1 } = req.query;
    const data = await fetchFromTMDB('/discover/movie', { with_genres, page });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to discover movies' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    apiKeyConfigured: TMDB_API_KEY ? 'Yes' : 'No'
  });
});

// Start server
app.listen(PORT, () => {
  console.log('========================================');
  console.log(`Netflix Clone Server`);
  console.log(`Running on: http://localhost:${PORT}`);
  console.log(`TMDB API: ${TMDB_API_KEY ? 'Configured ✓' : 'NOT CONFIGURED ✗'}`);
  console.log('========================================');
  
  if (!TMDB_API_KEY || TMDB_API_KEY === 'your_tmdb_api_key_here') {
    console.log('\n⚠️  WARNING: TMDB API Key not configured!');
    console.log('Get your free API key from: https://www.themoviedb.org/settings/api');
    console.log('Then update the .env file with your API key.\n');
  }
});
