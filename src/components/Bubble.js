import React, { useState } from 'react';
import './Bubble.css';

/* COMPONENTS IMPORT */
import WelcomeText from './WelcomeText.js';
import GamePhase from './GamePhase.js';

function Bubble({loading, questionsDatas, score, setScore}) {
    const [phaseGame, setPhaseGame] = useState('welcome1');

    return (
      <div className="bubble-container">

          {phaseGame === 'welcome1' && <WelcomeText phaseGame={phaseGame} setPhaseGame={() => setPhaseGame('welcome2')} />}

          {phaseGame === 'welcome2' && <WelcomeText phaseGame={phaseGame} setPhaseGame={() => setPhaseGame('game')} />}

          {phaseGame === 'game' && <GamePhase loading={loading} questionsDatas={questionsDatas} score={score} setScore={setScore}/>}

      	 <div className="bubble-under"/>
      </div>
    );
}

export default Bubble;
