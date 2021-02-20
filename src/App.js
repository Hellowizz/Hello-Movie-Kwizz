import logo from './logo.svg';
import './App.css';

/* COMPONENTS IMPORT */
import Bubble from './components/Bubble.js';
import RightSideGame from './components/RightSideGame.js';

function App() {
  return (
    <div className="App">
      <div className="game-container">
        <Bubble />
        <RightSideGame />
      </div>
      <div className="background-image-container"/>
    </div>
  );
}

export default App;
