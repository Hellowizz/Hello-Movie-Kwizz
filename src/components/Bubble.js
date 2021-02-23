import React, { useState } from 'react';
import './Bubble.css';

/* COMPONENTS IMPORT */
import WelcomeText from './WelcomeText.js';
import GamePhase from './GamePhase.js';
import GameOverPhase from './GameOverPhase.js';

function Bubble({loading, questionsDatas, score, highscore, setScore, reRunGame}) {
    const [phaseGame, setPhaseGame] = useState('welcome1');

    return (
      <div className="bubble-container">

          {phaseGame === 'welcome1' && <WelcomeText phaseGame={phaseGame} setPhaseGame={() => setPhaseGame('welcome2')} />}

          {phaseGame === 'welcome2' && <WelcomeText phaseGame={phaseGame} setPhaseGame={() => setPhaseGame('game')} />}

          {phaseGame === 'game' && <GamePhase setPhaseGame={setPhaseGame} loading={loading} questionsDatas={questionsDatas} score={score} highscore={highscore} setScore={setScore}/>}

          {phaseGame === 'gameOver' && <GameOverPhase phaseGame={phaseGame} setPhaseGame={() => setPhaseGame('game')} score={score} reRunGame={reRunGame}/>}

      	 <div className="bubble-under"/>
      </div>
    );
}

export default Bubble;
