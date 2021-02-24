import React from 'react';
import PropTypes from "prop-types";

/* COMPONENTS IMPORTS */
import QuestionComponent from './QuestionComponent';

/* MATERIAL UI */
import { Tooltip, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

/* TYPERITTER */
import Typewriter from 'typewriter-effect';

/* RESPONSIVE */
import { MediaQuery, useMediaQuery } from 'react-responsive'

/* BUTTON CUSTOMISATION */
const CustomYESButton = withStyles({
  root: {
    backgroundColor: '#89ee97',
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

const CustomNOButton = withStyles({
  root: {
    backgroundColor: '#f89141',
    marginLeft: '30px',
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

const CustomTooltip = withStyles({
  tooltip: {
    backgroundColor: '#4f2dcf',
  }
})(Tooltip);

const textLoading = <Typewriter
                    onInit={(typewriter) => {
                      typewriter
                        .changeDelay('20')
                        .typeString('<p>Please wait,</p>')
                        .typeString('<p>I\'m still thinking about questions</p>')
                        .changeDelay('800')
                        .typeString('<p>...</p>')
                        .changeDeleteSpeed('400')
                        .deleteChars('3')
                        .typeString('<p>...</p>')
                        .deleteChars('3')
                        .typeString('<p>...</p>')
                        .deleteChars('3')
                        .typeString('<p>...</p>')
                        .deleteChars('3')
                        .changeDeleteSpeed('20')
                        .deleteAll()
                        .changeDelay('20')
                        .typeString('<h2>Nothing came I\'m not inspired right now.</h2>')
                        .typeString('<h2>Please come back later.</h2>')
                        .start();
                    }}
                  />

class GamePhase extends React.Component {
  static propTypes = {
    phaseGame: PropTypes.string,
    setPhaseGame: PropTypes.func,
    loading: PropTypes.bool,
    questionsDatas: PropTypes.array,
    score: PropTypes.number,
    highscore: PropTypes.number,
    setScore: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = { idCurrentQuestion: 0, currentQuestionData: null, seconds: 60, isTabletOrMobile: undefined, showImage: null };

    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleTouch = this.handleTouch.bind(this);
  }

  componentDidMount () {
    if (!this.props.loading && this.props.questionsDatas) {
      this.setState({currentQuestionData: this.props.questionsDatas[0]});
    }

    this.startTimer();
  }

  startTimer() {
      if (this.timer === 0 && this.state.seconds > 0) {
        this.timer = setInterval(this.countDown, 1000);
      }
  }

  countDown() {
      this.setState({ seconds: this.state.seconds - 1 });
      
      if (this.state.seconds === 0) { 
        clearInterval(this.timer);
        this.props.setPhaseGame('gameOver');
      }
  }

  handleClick (buttonType) { // Click yes or no buttons
    if(buttonType === 'YES') {
      if(this.state.currentQuestionData && this.state.currentQuestionData.isTrue === true) {
        this.props.setScore(this.props.score + 1);
      }
    } else {
      if(this.state.currentQuestionData && this.state.currentQuestionData.isTrue === false) {
        this.props.setScore(this.props.score + 1);
      }
    }
    const newId = this.state.idCurrentQuestion + 1;
    this.setState({ showImage : null });
    if (newId >= this.props.questionsDatas.length) {
      clearInterval(this.timer);
      this.props.setPhaseGame('gameOver');
    }
    this.setState({idCurrentQuestion: newId, currentQuestionData:  this.props.questionsDatas[newId]});
  }

  handleTouch(toShow) { // Touch on the name of the actor or movie title (only for tablet and mobile mode)
    console.log('Touch and toShow : ' + toShow);
    this.setState({showImage : toShow});
  }

  // AJOUTER UN ONTOUCH POUR AFFICHER LES IMAGES EN MODE TELEPHONE ET TABLETTE !!!

  render()  {
    const loading = this.props.loading;
    const currentQuestionData = this.state.currentQuestionData;
    const sec = this.state.seconds;
    const showImage = this.state.showImage;
    const imgToShow = showImage !== null ? 
                      <img  alt="ImgActor" 
                            src={showImage === 'actor' ? currentQuestionData.actorImg : currentQuestionData.movieImg} 
                            style={{ height: '120px' }}
                      /> 
                      : undefined;

    const redValue = Math.floor(248 - sec*1.85);
    const greenValue = Math.floor(145 + sec*1.55);
    const blueValue = Math.floor(65 + sec*1.43);

    return (
        <div className="bubble-in">
            <div className="time-left" style={{ backgroundColor: 'rgb('+ redValue + ',' + greenValue + ',' + blueValue + ')'}}>{this.state.seconds}</div>
            <div className="typewriter" style = {{ display: 'flex', alignItems: 'center'}}>
                {loading === true && textLoading}
                {loading === false && currentQuestionData && 
                    <QuestionComponent questionData={currentQuestionData} handleTouch={this.handleTouch}/>
                }
            </div>
            {showImage !== null && <div className="show-image">{imgToShow}</div>}
            <div>
              <CustomYESButton onClick={() => this.handleClick('YES')}>YES</CustomYESButton>
              <CustomNOButton onClick={() => this.handleClick('NO')}>NO</CustomNOButton>
            </div>
            <div>
              <p className="score-container">Current score : <span style={{ color : '#74d19c', fontWeight: '600'}}>{this.props.score}</span></p>
              {this.props.highscore > 0 && 
                <p className="score-container">Highest score : <span style={{ color : '#f89141', fontWeight: '600'}}>{this.props.highscore}</span></p>
              }
            </div>
         </div>
    );
  }
}

export default GamePhase;