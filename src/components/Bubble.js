import './Bubble.css';

/* IMAGES */
import Pate from '../img/pate.svg';

let fullText = new Array(
	"<h1>WELCOME !</h1>", 
	"<p>My name is Pierre-Jean, I'm the presentator</p>",
	"<p>of this amazing game<p>"
);

function Bubble() {
  return (
    <div className="bubble-container">
    	<div className="bubble-in">
    		<div className="typewriter">{fullText}</div>
    		<div className="bubble-pate-container"><img alt="Pate" src={Pate} width='150px'/></div>
    	</div>
    	<div className="bubble-under"/>
    </div>
  );
}

export default Bubble;
