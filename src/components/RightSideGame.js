import './RightSideGame.css';

/* IMAGES */
import PierreJean from '../img/pierre-jean.png';

function RightSideGame() {
  return (
    <div className="right-container">
    	<div className="pierreJean-container">
    		<img alt="Pierre-Jean" src={PierreJean} style={{height: '100%'}} />
    	</div>
    </div>
  );
}

export default RightSideGame;