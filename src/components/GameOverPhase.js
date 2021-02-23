/* MATERIAL UI */
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

/* TYPERITTER */
import Typewriter from 'typewriter-effect';

/* BUTTON CUSTOMISATION */
const CustomButton = withStyles({
  root: {
    backgroundColor: '#f89141',
    '&:hover': {
      backgroundColor: '#4f2dcf'
    }
  },
  text: {
    padding: '15px 30px',
    color: 'white',
    fontWeight: '600',
    fontFamilu: 'Trebuchet MS, sans-serif'
  }
})(Button);

function GameOverPhase({phaseGame, setPhaseGame, score, reRunGame}) {
	return (
    	<div className="bubble-in">
        	<div className="typewriter">
            	<Typewriter
                    onInit={(typewriter) => {
                        typewriter
                        .changeDelay('50')
                        .typeString('<h1>GAME ENDS !</h1>')
                        .changeDelay('20')
                        .typeString(score > 20 ? '<p>You did great!</p>' : '<p>You can improve.</p>')
                        .typeString('<p>your score is <span>' + score + ' right answers</span> ! </p>')
                        .changeDelay('50')
                        .pauseFor()
                        .typeString('<h2 className="title-game">Please, try again !</h2>')
                        .start();
                    }}
                  />
        	</div>
        	<div className="bubble-buttons">
            	<CustomButton onClick={() => {reRunGame(); setPhaseGame();}}>
            		RETRY
            	</CustomButton>
        	</div>
   		 </div>
  	);
}

export default GameOverPhase;
