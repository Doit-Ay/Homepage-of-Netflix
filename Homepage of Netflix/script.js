const movieContainer = document.getElementById('movie-container');

// Example API call using The Movie Database (TMDb) API
fetch('https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY')
    .then(response => response.json())
    .then(data => {
        const movies = data.results;
        movies.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('movie');
            movieElement.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            `;
            movieContainer.appendChild(movieElement);
        });
    })
    .catch(error => console.error('Error fetching data:', error));
