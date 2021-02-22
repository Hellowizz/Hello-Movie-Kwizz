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
      backgroundColor: '#89ee97'
    }
  },
  text: {
    padding: '15px 30px',
    color: 'white',
    fontWeight: '600',
    fontFamilu: 'Trebuchet MS, sans-serif'
  }
})(Button);

const textWelcome1 = <Typewriter
	                	onInit={(typewriter) => {
	                  		typewriter
	                    	.changeDelay('50')
	                    	.typeString('<h1>WELCOME !</h1>')
	                    	.changeDelay('20')
	                    	.typeString('<p>My name is Pierre-Jean, I\'m the presentator</p>')
	                    	.typeString('<p>of this amazing game<p>')
	                    	.changeDelay('50')
	                    	.pauseFor()
	                    	.typeString('<h2 className="title-game">HELLO MOVIE KWIZZ !</h2>')
	                    	.start();
                		}}
              		/>;
const textWelcome2 = <Typewriter
		                onInit={(typewriter) => {
		                  typewriter
		                    .changeDelay('20')
		                    .typeString('<p>The rules are simples,</p>')
		                    .typeString('<p>I\'m going to ask you questions about movies<p>')
		                    .typeString('<p>and you will have <span>one minute</span> to answer,<p>')
		                    .changeDelay('50')
		                    .pauseFor()
		                    .typeString('<h2 className="title-game">LET\'S HAVE FUN !</h2>')
		                    .start();
		                }}
              		/>

function WelcomeText({phaseGame, setPhaseGame}) {
	const inButton = phaseGame === 'welcome1' ? 'Okay' : 'Play';

	return (
    	<div className="bubble-in">
        	<div className="typewriter">
            	{phaseGame === 'welcome1' && textWelcome1}
            	{phaseGame === 'welcome2' && textWelcome2}
        	</div>
        	<div className="bubble-buttons">
            	<CustomButton onClick={setPhaseGame}>
            		{inButton}
            	</CustomButton>
        	</div>
   		 </div>
  	);
}

export default WelcomeText;
