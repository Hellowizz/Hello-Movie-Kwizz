import React from 'react';
import './App.css';

/* FUNCTIONS IMPORTS */
import { arrangePersons, makeQuestions } from './functions/functions.js';


/* COMPONENTS IMPORTS */
import Bubble from './components/Bubble.js';
import RightSideGame from './components/RightSideGame.js';

class App extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = { 
	    	loading: true,
	    	datas: undefined,
	    	questionDatas: undefined,
	    	score: 0,
	    	highscore: 0
	    };
    	this.setScore = this.setScore.bind(this);
    	this.reRunGame = this.reRunGame.bind(this);
	 }

	async componentDidMount () {
		const url = 'https://api.themoviedb.org/3/person/popular?api_key=5d9a27da8576bf54dda76fd8ef6ebebb&language=en-US&page=';
		const response = await fetch(url + '1'); // ask for the page 1 of results
		const datas = await response.json();

		const response2 = await fetch(url + '2'); // ask for the page 2 of results
		const datas2 = await response2.json();

		const results = datas.results.concat(datas2.results);

		const persons = arrangePersons(results);
		const questionsDatas = makeQuestions(persons);

		this.setState({ loading: false, datas: persons, questionsDatas: questionsDatas });

		/* Get the high score save in the navigator if the is one */
		const savedHighScore = localStorage.getItem('highscoreSave');
		console.log('saved = ' + savedHighScore);
		if (savedHighScore) {
			this.setState({ highscore: savedHighScore });
		}
	}

	setScore (newScore) {
		this.setState({score : newScore});
		console.log('currentScore : ' + newScore);
	}

	reRunGame () {
		if(this.state.score > this.state.highscore) {
			this.setState({ highscore : this.state.score });
			localStorage.setItem('highscoreSave', this.state.score);
		}
		this.setScore(0);
		this.setState({ questionsDatas: makeQuestions(this.state.datas) }); // we wont have the same questions as before
	}

	render() {
	  	return (
		    <div className="App">
		      <div className="game-container">
		        <Bubble 
			        loading={this.state.loading} 
			        questionsDatas={this.state.questionsDatas} 
			        score={this.state.score} 
			        highscore={this.state.highscore} 
			        setScore={this.setScore} 
			        reRunGame={this.reRunGame}
			    />

		        <RightSideGame />
		      </div>
		      <div className="background-image-container" />
		    </div>
	 	 );
	}
}

export default App;
