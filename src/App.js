import React from 'react';
import './App.css';

/* COMPONENTS IMPORT */
import Bubble from './components/Bubble.js';
import RightSideGame from './components/RightSideGame.js';

class App extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = { 
	    	loading: true,
	    	datas: undefined
	    };
	  }

	async componentDidMount () {
		const url = 'https://api.themoviedb.org/3/person/popular?api_key=5d9a27da8576bf54dda76fd8ef6ebebb&language=en-US&page=1';
		const response = await fetch(url);
		const datas = await response.json();
		this.setState = { loading: false, datas: datas };
		console.log('datas : ' + JSON.stringify(datas));
	}

	render() {
	  	return (
		    <div className="App">
		      <div className="game-container">
		        <Bubble />
		        <RightSideGame />
		      </div>
		      <div className="background-image-container" />
		    </div>
	 	 );
	}
}

export default App;
