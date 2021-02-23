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
	    	score: 0
	    };
    	this.setScore = this.setScore.bind(this);
	 }

	async componentDidMount () {
		const url = 'https://api.themoviedb.org/3/person/popular?api_key=5d9a27da8576bf54dda76fd8ef6ebebb&language=en-US&page=1';
		const response = await fetch(url);
		const datas = await response.json();

		const persons = arrangePersons(datas);
		const questionsDatas = makeQuestions(persons);

		this.setState({ loading: false, datas: persons, questionsDatas: questionsDatas });
	}

	setScore (newScore) {
		this.setState({score : newScore});
		console.log('currentScore : ' + newScore);
	}

	render() {
	  	return (
		    <div className="App">
		      <div className="game-container">
		        <Bubble loading={this.state.loading} questionsDatas={this.state.questionsDatas} score={this.state.score} setScore={this.setScore}/>
		        <RightSideGame />
		      </div>
		      <div className="background-image-container" />
		    </div>
	 	 );
	}
}

export default App;
