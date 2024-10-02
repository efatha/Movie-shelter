// Mock data to represent videos
const newVideos = [
    { title: "Sample Video", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
    // Add more sample videos if necessary
];

const oldVideos = [
    { title: "Old Victory Speech", url: "video3.mp4" },
    { title: "Old Parliament Address", url: "video4.mp4" },
];

// Load mock videos on page load
document.addEventListener("DOMContentLoaded", function () {
    loadVideos(newVideos, "new-video-container");
    loadVideos(oldVideos, "old-video-container");
});

// Function to load videos into the container
function loadVideos(videoArray, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    videoArray.forEach(video => {
        const videoElement = document.createElement("video");
        videoElement.src = video.url;
        videoElement.controls = true;
        container.appendChild(videoElement);
    });
}
// TMDb API integration
const API_KEY = 'd1a3388624698371c99e11076c818a19'; // Replace with your actual TMDb API key
const BASE_URL = 'https://api.themoviedb.org/3';

// Fetch popular movies from the TMDb API
function fetchMovies() {
    const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayMovies(data.results, 'new-video-container');
        })
        .catch(error => {
            console.error('Error fetching movie data:', error);
        });
}

// Function to display movies from the TMDb API
function displayMovies(movies, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        // Create a clickable image that plays the video when clicked
        const movieImage = document.createElement('img');
        movieImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        movieImage.alt = movie.title;
        movieImage.style.cursor = 'pointer'; // Change cursor to pointer

        // Add click event to play the video
        movieImage.addEventListener('click', () => {
            fetchMovieVideos(movie.id); // Fetch video details for the clicked movie
        });

        movieElement.innerHTML = `
            <h3>${movie.title}</h3>
            <p>Release Date: ${movie.release_date}</p>
        `;
        movieElement.prepend(movieImage); // Add image to the front
        container.appendChild(movieElement);
    });
}
// Fetch video details for a specific movie
function fetchMovieVideos(movieId) {
    const url = `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const video = data.results[0]; // Get the first video
            if (video) {
                const videoUrl = `https://www.youtube.com/watch?v=${video.key}`; // Get the video URL
                playVideo(video.key); // Play the video on the site
            } else {
                alert("No video found for this movie.");
            }
        })
        .catch(error => {
            console.error('Error fetching movie videos:', error);
        });
}

// Function to embed the video in a modal
function playVideo(videoKey) {
    const videoContainer = document.getElementById('video-player');
    const videoElement = document.getElementById('video-player-video');

    videoElement.src = `https://www.youtube.com/embed/${videoKey}`; // Embed YouTube video
    videoContainer.style.display = 'block'; // Show the video player
}

// Close the video player
function closeVideo() {
    const videoContainer = document.getElementById('video-player');
    const videoElement = document.getElementById('video-player-video');

    videoElement.src = ''; // Stop the video
    videoContainer.style.display = 'none'; // Hide the video player
}
// Call fetchMovies to load API videos on page load
document.addEventListener("DOMContentLoaded", fetchMovies);

// Search functionality
document.getElementById('searchBtn').addEventListener('click', () => {
    const query = document.getElementById('searchBar').value.toLowerCase();
    searchMovies(query);
});

// Search movies by title using the TMDb API
function searchMovies(query) {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=1`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayMovies(data.results, 'new-video-container');
        })
        .catch(error => {
            console.error('Error searching movie data:', error);
        });
}

// Autocomplete suggestions
const suggestionsBox = document.getElementById('suggestions');
const searchBar = document.getElementById('searchBar');
const videos = [...newVideos, ...oldVideos];

searchBar.addEventListener('input', function () {
    const query = searchBar.value.toLowerCase();
    suggestionsBox.innerHTML = '';
    const suggestions = videos.filter(video => video.title.toLowerCase().includes(query));

    if (suggestions.length) {
        suggestionsBox.style.display = 'block';
        suggestions.forEach(suggestion => {
            const div = document.createElement('div');
            div.textContent = suggestion.title;
            div.addEventListener('click', function () {
                searchBar.value = suggestion.title;
                suggestionsBox.style.display = 'none';
                searchMovies(suggestion.title); // Trigger search on click
            });
            suggestionsBox.appendChild(div);
        });
    } else {
        suggestionsBox.style.display = 'none';
    }
});

// Hide suggestions when clicking outside
document.addEventListener('click', function (e) {
    if (!suggestionsBox.contains(e.target)) {
        suggestionsBox.style.display = 'none';
    }
});

// Close the video player when clicking outside of it
document.getElementById('video-player').addEventListener('click', closeVideo);
