
/* RESPONSIVE */
import { useMediaQuery } from 'react-responsive'

/* MATERIAL UI */
import { Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const CustomTooltip = withStyles({
  tooltip: {
    backgroundColor: '#4f2dcf',
  }
})(Tooltip);

function QuestionsComponent({questionData, handleTouch}) {
    const isTabletOrMobileDevice = useMediaQuery({ maxDeviceWidth: 1224 });

	return (
    	<div>
            {!isTabletOrMobileDevice && <p>Did 
                <CustomTooltip title={<img alt="ImgActor" src={questionData.actorImg} style={{ width: '170px' }}/>}>
                    <span> {questionData.actorName}</span>
                </CustomTooltip>
            </p>}
            {!isTabletOrMobileDevice && <p>star in 
                <CustomTooltip title={<img alt="ImgMovie" src={questionData.movieImg} style={{ width: '170px' }}/>}>
                    <span> {questionData.movieTitle}</span>
                </CustomTooltip> ?
            </p>}

            {isTabletOrMobileDevice && <p>Did <span onTouchStart={()=> handleTouch('actor')}>{questionData.actorName}</span></p>}
            {isTabletOrMobileDevice && <p>star in <span onTouchStart={()=> handleTouch('movie')}> {questionData.movieTitle}</span> ?</p>}
        </div>
  	);
}

export default QuestionsComponent;