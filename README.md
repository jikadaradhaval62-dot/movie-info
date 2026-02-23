# Netflix Clone - Complete Setup Guide

A full-stack Netflix-like movie streaming website built with React.js, Node.js, and The Movie Database (TMDB) API.

## Project Structure

```
netflix-clone/
├── server/                 # Backend (Node.js + Express)
│   ├── server.js           # Main server file
│   ├── package.json        # Dependencies
│   └── .env                # API key configuration
│
└── client/                 # Frontend (React)
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/     # React components
    │   │   ├── Navbar.js
    │   │   ├── Navbar.css
    │   │   ├── Hero.js
    │   │   ├── Hero.css
    │   │   ├── MovieRow.js
    │   │   ├── MovieRow.css
    │   │   ├── MovieCard.js
    │   │   ├── MovieCard.css
    │   │   ├── MovieModal.js
    │   │   ├── MovieModal.css
    │   │   ├── Footer.js
    │   │   └── Footer.css
    │   ├── hooks/
    │   │   └── useMovies.js
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    └── package.json
```

## Prerequisites

- **Node.js**: v16.16.0 or higher
- **npm**: v8.11.0 or higher
- **TMDB API Key**: Free from https://www.themoviedb.org

## Step-by-Step Setup

### Step 1: Get TMDB API Key

1. Go to https://www.themoviedb.org/signup
2. Create a free account
3. Verify your email
4. Go to https://www.themoviedb.org/settings/api
5. Click "Create" or "Request API Key"
6. Fill in the form (can use "Student Project" for app description)
7. Copy your API Key (v3 auth) - it looks like: `abc123def456ghi789`

### Step 2: Setup Backend Server

Open a terminal and run:

```bash
# Navigate to server folder
cd netflix-clone/server

# Install dependencies
npm install

# Configure API key
# Edit the .env file and replace "your_tmdb_api_key_here" with your actual TMDB API key
# On Windows:
notepad .env
# On Mac/Linux:
nano .env

# Start the server
npm start
```

You should see:
```
========================================
Netflix Clone Server
Running on: http://localhost:5000
TMDB API: Configured ✓
========================================
```

**Keep this terminal running!**

### Step 3: Setup Frontend (New Terminal)

Open a **new** terminal window/tab and run:

```bash
# Navigate to client folder
cd netflix-clone/client

# Install dependencies
npm install

# Start the React app
npm start
```

The browser should open automatically at http://localhost:3000

If it doesn't open, manually go to: http://localhost:3000

## Troubleshooting

### Error: "Cannot find module"

Run `npm install` again in both folders:
```bash
cd server && npm install
cd ../client && npm install
```

### Error: "Port 5000 already in use"

Change the port in `server/.env`:
```
PORT=5001
```

Then update `client/src/hooks/useMovies.js`:
```javascript
const API_BASE_URL = 'http://localhost:5001/api';
```

### Error: "TMDB API: NOT CONFIGURED"

1. Check your `.env` file has the correct format:
```
PORT=5000
TMDB_API_KEY=your_actual_api_key_here
```

2. Make sure there are no spaces around the `=`
3. Restart the server after editing `.env`

### CORS Errors

Make sure the backend server is running on port 5000 before starting the frontend.

### Images Not Loading

Check your internet connection. Images are loaded from TMDB's CDN.

## Features

- ✅ Browse trending, popular, top-rated movies
- ✅ Browse TV shows
- ✅ Search movies and TV shows
- ✅ View movie details with cast and genres
- ✅ Watch YouTube trailers
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Netflix-style UI with dark theme

## API Endpoints (Backend)

| Endpoint | Description |
|----------|-------------|
| GET /api/trending/:type/:timeWindow | Get trending content |
| GET /api/movies/popular | Popular movies |
| GET /api/movies/top-rated | Top rated movies |
| GET /api/movies/upcoming | Upcoming movies |
| GET /api/movies/now-playing | Now playing movies |
| GET /api/movie/:id | Movie details + trailer |
| GET /api/tv/popular | Popular TV shows |
| GET /api/tv/:id | TV show details |
| GET /api/search?query=xxx | Search content |
| GET /api/health | Server health check |

## Tech Stack

**Frontend:**
- React 18
- CSS3 (no external CSS framework)
- Lucide React (icons)

**Backend:**
- Node.js
- Express.js
- Axios (HTTP client)
- CORS
- dotenv

**API:**
- The Movie Database (TMDB) API

## Development

To add new features:

1. **Add a new movie category:**
   - Add endpoint in `server/server.js`
   - Add hook in `client/src/hooks/useMovies.js`
   - Add MovieRow in `client/src/App.js`

2. **Customize styling:**
   - Edit CSS files in `client/src/components/`

3. **Add new pages:**
   - Create new components in `client/src/components/`
   - Add routing with react-router-dom

## License

This is a student project for educational purposes only.
Not affiliated with Netflix.

Data provided by [TMDB](https://www.themoviedb.org/).
