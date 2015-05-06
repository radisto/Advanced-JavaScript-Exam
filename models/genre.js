var imdb = imdb || {};

(function(scope){
    var id = 1;

    function Genre(name){
        this.name = name;
        this._movies = [];
        this._id = id++;
    }

    Genre.prototype.addMovie = function(movie){
        this._movies.push(movie);
    }

    Genre.prototype.deleteMovie = function(movie){
        for (var i = 0; i < this._movies.length; i++){
            if (movie.isEqual(this._movies[i])){
                this._movies.splice(i, 1);
            }
        }
    }

    Genre.prototype.deleteMovieById = function(id){
        for (var i = 0; i < this._movies.length; i++){
            if (id === parseInt(this._movies[i]._id)){
                this._movies.splice(i, 1);
            }
        }
    }

    Genre.prototype.getMovies = function(){
        return this._movies;
    }

    scope.getGenre = function(name){
        return new Genre(name);
    }
})(imdb);