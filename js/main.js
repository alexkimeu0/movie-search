let apikey = ''
$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchTxt = $('#searchTxt').val();

        getMovies(searchTxt);

        e.preventDefault();
    });
})


function getMovies(searchTxt) {
    axios.get('http://www.omdbapi.com/?apikey=d35c3b7b&s=' + searchTxt)
        .then((response) => {
            let movies = response.data.Search;
            let output = '';

            $.each(movies, (index, movie) => {
                output += `
                    <div class="col-md-3">
                        <div class="well text-center">
                            <img src="${movie.Poster}" />
                            <h5>${movie.Title}</h5>
                            <a href="#" onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary">Movie Details</a>
                        </div>
                    </div>
                `
            });

            $('#movies').html(output);
        })
        .catch((err) => {
            console.log(err);
        })
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');

    axios.get('http://www.omdbapi.com/?apikey=d35c3b7b&i=' + movieId)
        .then((response) => {
            console.log(movieId);
            let movie = response.data;

            let output = `
                <div class="col-md-4">
                    <img src="${movie.Poster}" class="thumbnail">
                </div>
                <div class="col-md-8">
                    <h2>${movie.Title}</h2>
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Genre:</strong>&nbsp;${movie.Genre}</li>
                        <li class="list-group-item"><strong>Released:</strong>&nbsp;${movie.Released}</li>
                        <li class="list-group-item"><strong>IMDB Rating:</strong>&nbsp;${movie.imdbRating}</li>
                        <li class="list-group-item"><strong>Director:</strong>&nbsp;${movie.Director}</li>
                        <li class="list-group-item"><strong>Writer:</strong>&nbsp;${movie.Writer}</li>
                        <li class="list-group-item"><strong>Actors:</strong>&nbsp;${movie.Actors}</li>
                    </ul>    
                    
                    <hr>
                    <div class="well">
                        <h3>Plot</h3>
                        <p>${movie.Plot}</p>
                        <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
                        <a href="index.html" class="btn btn-info">Go Back to Search</a> 
                    </div>
                </div>
                `;

            $('#movie').html(output);
        })
        .catch((err) => {
            console.log(err);
        })
}