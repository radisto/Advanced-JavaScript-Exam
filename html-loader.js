var imdb = imdb || {};

(function (scope) {
	function loadHtml(selector, data) {
		var container = document.querySelector(selector),
			moviesContainer = document.getElementById('movies'),
			detailsContainer = document.getElementById('details'),
			genresUl = loadGenres(data);

		container.appendChild(genresUl);

		genresUl.addEventListener('click', function (ev) {
			if (ev.target.tagName === 'LI') {
				var genreId,
					genre,
					moviesHtml;

				genreId = parseInt(ev.target.getAttribute('data-id'));
				genre = data.filter(function (genre) {
					return genre._id === genreId;
				})[0];

				moviesHtml = loadMovies(genre.getMovies());
				moviesContainer.innerHTML = moviesHtml.outerHTML;
				moviesContainer.setAttribute('data-genre-id', genreId);
			}
		});

		moviesContainer.addEventListener('click', function (ev) {
			if (ev.target.tagName === 'LI') {
				var movieId,
					actors,
					reviews;

				movieId = parseInt(ev.target.getAttribute('data-id'));
				for (var i = 0; i < data.length; i++){
					for (var j = 0; j < data[i]._movies.length; j++){
						if (movieId === data[i]._movies[j]._id){
							actors = data[i]._movies[j]._actors;
							reviews = data[i]._movies[j]._reviews;
						}
					}
				}
				detailsContainer.innerHTML = '';
				for (i = 0; i < actors.length; i++){
					var title = document.createElement('h3');
					title.innerHTML = 'Actors';
					if (i == 0) {
						detailsContainer.appendChild(title);
					}
					var li = document.createElement('li');
					var actor = document.createElement('h5');
					actor.innerHTML = actors[i].name;
					var bio = document.createElement('h6');
					bio.innerHTML = '<strong>Bio: </strong>';
					bio.innerHTML += actors[i].bio;
					var born = document.createElement('h6');
					born.innerHTML = '<strong>Born: </strong>';
					born.innerHTML += actors[i].born;
					li.appendChild(actor);
					li.appendChild(bio);
					li.appendChild(born);
					var ul = document.createElement('ul');
					ul.appendChild(li);
					detailsContainer.appendChild(ul);
				}

				for (i = 0; i < reviews.length; i++){
					title = document.createElement('h3');
					title.innerHTML = 'Reviews';
					if (i == 0) {
						detailsContainer.appendChild(title);
					}
					li = document.createElement('li');
					var author = document.createElement('h5');
					author.innerHTML = reviews[i].author;
					var content = document.createElement('h6');
					content.innerHTML = 'Content: ' + reviews[i].content;
					var date = document.createElement('h6');
					date.innerHTML = 'Date: ' + reviews[i].date;
					li.appendChild(author);
					li.appendChild(content);
					li.appendChild(date);
					ul = document.createElement('ul');
					ul.appendChild(li);
					detailsContainer.appendChild(ul);
				}
			}
			else if (ev.target.tagName === 'BUTTON') {
				var id = ev.target.getAttribute("name");
				var nodes = document.querySelectorAll('[data-id="' + id + '"]');
				var last = nodes[nodes.length- 1];
				var parent = document.getElementById('movies').firstChild;
				parent.removeChild(last);
			}
		});
	}

	function loadGenres(genres) {
		var genresUl = document.createElement('ul');
		genresUl.setAttribute('class', 'nav navbar-nav');
		genres.forEach(function (genre) {
			var liGenre = document.createElement('li');
			liGenre.innerHTML = genre.name;
			liGenre.setAttribute('data-id', genre._id);
			genresUl.appendChild(liGenre);
		});

		return genresUl;
	}

	function loadMovies(movies) {
		var moviesUl = document.createElement('ul');
		movies.forEach(function (movie) {
			var liMovie = document.createElement('li');
			liMovie.setAttribute('data-id', movie._id);

			liMovie.innerHTML = '<h3>' + movie.title + '</h3>';
			liMovie.innerHTML += '<div>Country: ' + movie.country + '</div>';
			liMovie.innerHTML += '<div>Time: ' + movie.length + '</div>';
			liMovie.innerHTML += '<div>Rating: ' + movie.rating + '</div>';
			liMovie.innerHTML += '<div>Actors: ' + movie._actors.length + '</div>';
			liMovie.innerHTML += '<div>Reviews: ' + movie._reviews.length + '</div>';

			var button = document.createElement('button');
			button.setAttribute('name', movie._id);
			button.innerText = 'Delete movie';
			liMovie.appendChild(button);

			moviesUl.appendChild(liMovie);
		});

		return moviesUl;
	}

	scope.loadHtml = loadHtml;
}(imdb));