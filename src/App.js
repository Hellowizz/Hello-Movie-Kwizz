import './App.css';

/* COMPONENTS IMPORT */
import Bubble from './components/Bubble.js';
import RightSideGame from './components/RightSideGame.js';

function handleTest (searchTerm) {
	fetch(`https://api.themoviedb.org/3/person/popular?api_key=5d9a27da8576bf54dda76fd8ef6ebebb&language=en-US&page=1`)
	.then(data => data.json())
	.then(data => {
		console.log('datas : ' + data.results);
	})
}

function App() {

  	return (
	    <div className="App">
	      <div className="game-container">
	      	{ handleTest() }
	        <Bubble />
	        <RightSideGame />
	      </div>
	      <div className="background-image-container" />
	    </div>
 	 );
}

export default App;
