/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { saveScore } from '../redux/actions';
import { getQuestions } from '../services/fetchApi';

class Game extends Component {
  state = {
    question: {},
    randomAnswerButtons: [],
    nextQuestion: false,
    timeLeft: 5,
    disabled: false,
  };

  async componentDidMount() {
    const questions = await getQuestions();
    this.setState({
      question: questions[0],
    }, () => {
      this.createAnswerButtons();
      // this.handleTimer();
      this.interval = setInterval(this.handleTimer, 1000);
    });
  }

  handleTimer = () => {
    const { timeLeft } = this.state;
    if (timeLeft === 0) {
      this.setState({ disabled: true }, () => console.log(this.state.disabled));
      clearInterval(this.interval);
    } else {
      this.setState({ timeLeft: timeLeft - 1 });
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
    const buttons = document.querySelectorAll('.answer-button');
    buttons.forEach((button) => {
      button.style.border = (
        button.ariaLabel === 'correct-answer' ? (
          '3px solid rgb(6, 240, 15)'
        ) : '3px solid red'
      );
    });
    // clearInterval(this.interval);
    if (e.target.ariaLabel === 'correct-answer') {
      this.calculateScore();
    }
    this.setState({ nextQuestion: true });
  };

  createAnswerButtons = () => {
    const { question, disabled } = this.state;
    if (question && Object.keys(question).length > 0) {
      const correctAnswerBtn = (
        <button
          data-testid="correct-answer"
          className="answer-button"
          dangerouslySetInnerHTML={ { __html: question.correct_answer } }
          aria-label="correct-answer"
          disabled={ disabled }
          onClick={ this.handleAnswerButtonClick }
        />
      );
      const incorrectAnswerBtns = (
        question.incorrect_answers.map((answer, index) => (
          <button
            data-testid={ `wrong-answer-${index}` }
            key={ index }
            className="answer-button"
            dangerouslySetInnerHTML={ { __html: answer } }
            aria-label="incorrect-answer"
            disabled={ disabled }
            onClick={ this.handleAnswerButtonClick }
          />
        ))
      );
      const buttons = [correctAnswerBtn, ...incorrectAnswerBtns];
      const randomComparator = 0.5;
      const randomAnswerButtons = buttons.sort(() => Math.random() - randomComparator);
      this.setState({ randomAnswerButtons });
    }
  };

  // handleTimer = () => {
  //   const INTERVAL_TIME = 30000;
  //   setTimeout(() => {
  //     const answerButtons = document.querySelectorAll('.answer-button');
  //     answerButtons.forEach((button) => { button.disabled = true; });
  //   }, INTERVAL_TIME);
  // };

  render() {
    const { question, randomAnswerButtons, nextQuestion, timeLeft } = this.state;
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
                {button}
              </div>

            ))
          }
          {
            nextQuestion && <button data-testid="btn-next">Next</button>
          }
        </div>
      );
    }
    return <div>Loading...</div>;
  }
}

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Game);
