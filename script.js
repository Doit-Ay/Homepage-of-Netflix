const apiKey = '536e49b1326673cf046d05b5e77bc45b';

document.addEventListener('DOMContentLoaded', () => {
    fetchMovies('popular', 'popular-movie-container');
    fetchMovies('tv', 'tv-shows-container');
    fetchMovies('top_rated', 'movies-container');
    fetchMovies('now_playing', 'new-popular-container');
});

function fetchMovies(type, containerId) {
    let url = `https://api.themoviedb.org/3/movie/${type}?api_key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById(containerId);
            data.results.forEach(movie => {
                const movieElement = document.createElement('div');
                movieElement.classList.add('movie');
                movieElement.dataset.movieId = movie.id;
                movieElement.innerHTML = `
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                    <div class="movie-details">
                        <h3>${movie.title}</h3>
                        <p>Rating: ${movie.vote_average}</p>
                    </div>
                `;
                container.appendChild(movieElement);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

document.addEventListener('click', function(e) {
    if (e.target.closest('.movie')) {
        const movieId = e.target.closest('.movie').dataset.movieId;
        openMovieDetails(movieId);
    }
});

function openMovieDetails(movieId) {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
        .then(response => response.json())
        .then(movie => {
            const modal = document.getElementById('modal');
            const modalBody = document.getElementById('modal-body');
            modalBody.innerHTML = `
                <h2>${movie.title}</h2>
                <p>${movie.overview}</p>
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            `;
            modal.style.display = 'flex';
        })
        .catch(error => console.error('Error fetching movie details:', error));
}

document.querySelector('.close-button').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === document.getElementById('modal')) {
        document.getElementById('modal').style.display = 'none';
    }
});
