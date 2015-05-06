var imdb = imdb || {};

(function(scope){
    var id = 1;

    function Theatre(isPuppet){
        scope._movie.apply(this, arguments);
        this.isPuppet = isPuppet;
        this._id = id++;
    }

    Theatre.extend(scope._movie);

    scope.getTheatre = function(title, length, rating, country){
        return new Theatre(title, length, rating, country);
    }
})(imdb);