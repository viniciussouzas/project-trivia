/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { saveScore } from '../redux/actions';
import { getQuestions } from '../services/fetchApi';

const SET_INTERVAL = 1000;

class Game extends Component {
  state = {
    question: {},
    questions: [],
    index: 0,
    interval: null,
    btnClicked: false,
    randomAnswerButtons: [],
    timeLeft: 30,
  };

  async componentDidMount() {
    const questions = await getQuestions();
    this.setState({
      questions,
    }, this.handleNextQuestion);
  }

  handleNextQuestion = () => {
    const MAX_INDEX = 4;
    const { questions, index } = this.state;
    const { history } = this.props;

    if (index <= MAX_INDEX) {
      this.setState({
        question: questions[index],
        index: index + 1,
      }, this.createAnswerButtons);
      const interval = setInterval(() => this.handleTimerState(interval), SET_INTERVAL);
      this.setState({
        interval,
        btnClicked: false,
      });
    } else {
      history.push('/feedback');
    }
  };

  handleTimerState = (interval) => {
    const { timeLeft } = this.state;

    if (timeLeft > 0) {
      this.setState({ timeLeft: timeLeft - 1 });
    } else {
      clearInterval(interval);
      this.setState({ btnClicked: true });
    }
  };

  convertDifficulty = () => {
    const hardLevel = 3;

    const { question } = this.state;

    switch (question.difficulty) {
    case 'easy':
      return 1;
    case 'medium':
      return 2;
    case 'hard':
      return hardLevel;
    default:
      return 0;
    }
  };

  calculateScore = () => {
    const baseScore = 10;
    const { timeLeft } = this.state;

    const { dispatch } = this.props;

    const score = baseScore + (timeLeft * this.convertDifficulty());

    dispatch(saveScore(score));
  };

  handleAnswerButtonClick = (e) => {
    const { interval } = this.state;
    clearInterval(interval);

    if (!e.includes('incorrect-answer')) {
      this.calculateScore();
    }

    this.setState({ btnClicked: true });
  };

  createAnswerButtons = () => {
    const { question } = this.state;
    if (question && Object.keys(question).length > 0) {
      const correctAnswerBtn = {
        dataTestid: 'correct-answer',
        className: 'answer-button',
        answer: question.correct_answer,
        ariaLabel: 'correct-answer',
      };
      const incorrectAnswerBtns = (
        question.incorrect_answers.map((answer, index) => (
          {
            dataTestid: `wrong-answer-${index}`,
            className: 'answer-button',
            answer,
            ariaLabel: 'incorrect-answer',
          }
        ))
      );

      const buttons = [correctAnswerBtn, ...incorrectAnswerBtns];
      const randomComparator = 0.5;
      const randomAnswerButtons = buttons.sort(() => Math.random() - randomComparator);
      this.setState({ randomAnswerButtons });
    }
  };

  render() {
    const { question, randomAnswerButtons, timeLeft, btnClicked } = this.state;
    if (question && Object.keys(question).length > 0) {
      return (
        <div>
          <Header />
          <p>{timeLeft}</p>
          <p data-testid="question-category">{question.category}</p>
          <p
            data-testid="question-text"
            dangerouslySetInnerHTML={ {
              __html: question.question,
            } }
          />
          {
            randomAnswerButtons.map((button, index) => (
              <div
                key={ index }
                data-testid="answer-options"
              >
                <button
                  data-testid={ button.dataTestid }
                  onClick={ () => this.handleAnswerButtonClick(button.ariaLabel) }
                  className={ btnClicked ? button.ariaLabel : '' }
                  disabled={ btnClicked }
                >
                  {button.answer}
                </button>
              </div>

            ))
          }
          {
            btnClicked && (
              <button
                data-testid="btn-next"
                onClick={ this.handleNextQuestion }
              >
                Next
              </button>)
          }
        </div>
      );
    }
    return <div>Loading...</div>;
  }
}

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Game);
