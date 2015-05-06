var imdb = imdb || {};

(function(scope){
    var id = 1;

    function Movie(title, length, rating, country){
        this.title = title;
        this.length = length;
        this.rating = rating;
        this.country = country;
        this._actors = [];
        this._reviews = [];
        this._id = id++;
    }

    scope._movie = Movie;

    Movie.prototype.addActor = function(actor){
        this._actors.push(actor);
    }

    Movie.prototype.getActors = function(){
        return this._actors;
    }

    Movie.prototype.addReview = function(review){
        this._reviews.push(review);
    }

    Movie.prototype.deleteReview = function(review){
        for (var i = 0; i < this._reviews.length; i++){
            if (review.isEqual(this._reviews[i])){
                this._reviews.splice(i, 1);
            }
        }
    }

    Movie.prototype.deleteReviewById = function(id){
        for (var i = 0; i < this._reviews.length; i++){
            if (id === parseInt(this._reviews[i]._id)){
                this._reviews.splice(i, 1);
            }
        }
    }

    Movie.prototype.getReviews = function(){
        return this._reviews;
    }

    scope.getMovie = function(title, length, rating, country){
        return new Movie(title, length, rating, country);
    }
})(imdb);