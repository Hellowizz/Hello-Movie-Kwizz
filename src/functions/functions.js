const NUMBER_OF_QUESTIONS = 100;

export function arrangePersons (datas) {
	let persons = [];

	for (let person of datas) {
		let movies = [];
		for (let movie of person.known_for) {
			if (movie.media_type === 'movie') {
				const movieData = {'id' : movie.id, 'title' : movie.title, 'imgPath': 'https://image.tmdb.org/t/p/w500/' + movie.poster_path};
				movieData.length !== 0 && movies.push(movieData);
			}
		}
		const personData = {'id': person.id, 'name': person.name, 'movies': movies, 'imgPath': 'https://image.tmdb.org/t/p/w500/' + person.profile_path};
		movies.length !== 0 && persons.push(personData);
	}

	return persons;
}

export function makeQuestions (persons) {
	let questionsTab = [];

	for(let i=0; i<(NUMBER_OF_QUESTIONS -1); ++i) {

		let isTrue = (Math.random() > .6);
		const idInTabActor = Math.floor(Math.random() * persons.length);
		const actor = persons[idInTabActor];
		let idInTabMovie = Math.floor(Math.random() * actor.movies.length);
		let movie = actor.movies[idInTabMovie];

		// console.log(actor.name + ' did star in : ' + movie.title);
		// console.log('The answer should be : ' + isTrue);

		if (!isTrue) {
			const idInTabSecondActor = Math.floor(Math.random() * persons.length);
			const secondActor = persons[idInTabSecondActor];
			// console.log('Then, the second actor from who to take the movie is : ' + secondActor.name);
			if (idInTabActor === idInTabSecondActor) {
				isTrue = true;
				// console.log('Arf, we pick the same, let say the question has the right answer !')
			} else {
				idInTabMovie = Math.floor(Math.random() * secondActor.movies.length);
				movie = secondActor.movies[idInTabMovie];
				/* search if they did star in the same movie */
				const playedInSameMovie = actor.movies.findIndex(movieFirst => movieFirst.id === movie.id);
				// console.log('Did they star in the same movie ? ' + (playedInSameMovie !== -1));
				if (playedInSameMovie !== -1) { isTrue = true }
				// console.log('If no, ' + actor.name + ' did not star in ' + movie.title);
			}
		}
		const questionData = {'id' : i, 'isTrue': isTrue, 'actorName': actor.name, 'actorId': actor.id, 'actorImg': actor.imgPath, 
							'movieTitle': movie.title, 'movieId': movie.id, 'movieImg': movie.imgPath}
		questionsTab.push(questionData);
	}

	return questionsTab;
}