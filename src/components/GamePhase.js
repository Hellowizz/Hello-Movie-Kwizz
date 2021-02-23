import React from 'react';
import PropTypes from "prop-types";

/* MATERIAL UI */
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

/* TYPERITTER */
import Typewriter from 'typewriter-effect';

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
    setScore: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = { idCurrentQuestion: 0, currentQuestionData: null, seconds: 60 };

    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount () {
    if (!this.props.loading && this.props.questionsDatas) {
      this.setState({currentQuestionData: this.props.questionsDatas[0]});
    }

    this.startTimer();
  }

  startTimer() {
      if (this.timer == 0 && this.state.seconds > 0) {
        this.timer = setInterval(this.countDown, 1000);
      }
      console.log('start timer');
  }

  countDown() {
      // Remove one second, set state so a re-render happens.
      this.setState({ seconds: this.state.seconds - 1 });
      
      // Check if we're at zero.
      if (this.state.seconds == 0) { 
        clearInterval(this.timer);
      }
  }

  handleClick (buttonType) {
    if(buttonType === 'YES') {
      if(this.state.currentQuestionData.isTrue === true) {
        this.props.setScore(this.props.score + 1);
      }
    } else {
      if(this.state.currentQuestionData.isTrue === false) {
        this.props.setScore(this.props.score + 1);
      }
    }
    const newId = this.state.idCurrentQuestion + 1;
    this.setState({idCurrentQuestion: newId, currentQuestionData:  this.props.questionsDatas[newId]});
  }

  render()  {
    const loading = this.props.loading;
    const currentQuestionData = this.state.currentQuestionData;
    const sec = this.state.seconds;
    const redValue = Math.floor(248 - sec*1.85);
    const greenValue = Math.floor(145 + sec*1.55);
    const blueValue = Math.floor(65 + sec*1.43);

    return (
        <div className="bubble-in">
            <div className="time-left" style={{ backgroundColor: 'rgb('+ redValue + ',' + greenValue + ',' + blueValue + ')'}}>{this.state.seconds}</div>
            <div className="typewriter" style = {{ display: 'flex', alignItems: 'center'}}>
                {loading === true && textLoading}
                {loading === false && currentQuestionData && 
                    <div>
                      <p>Did <span>{currentQuestionData.actorName}</span></p>
                      <p>star in <span>{currentQuestionData.movieTitle}</span>?</p>
                    </div>
                }
            </div>
            <div>
              <CustomYESButton onClick={() => this.handleClick('YES')}>YES</CustomYESButton>
              <CustomNOButton onClick={() => this.handleClick('NO')}>NO</CustomNOButton>
            </div>
         </div>
    );
  }
}

export default GamePhase;