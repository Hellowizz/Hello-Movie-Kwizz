import './RightSideGame.css';

/* RESPONSIVE */
import { useMediaQuery } from 'react-responsive'

/* IMAGES */
import PierreJean from '../img/pierre-jean.png';

function RightSideGame() {

	const isTabletOrMobileDevice = useMediaQuery({ maxDeviceWidth: 1224 });

	return (
	  	<div className="right-container">
		   	<div className="pierreJean-container">
		    	<img alt="Pierre-Jean" src={PierreJean} style={isTabletOrMobileDevice ? {width: '100%'}: {height: '75%'}} />
		   	</div>
	  	</div>
	);
}

export default RightSideGame;