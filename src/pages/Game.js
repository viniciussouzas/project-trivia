/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import Header from '../components/Header';
import { getQuestions } from '../services/fetchApi';

class Game extends Component {
  state = {
    question: {},
    randomAnswerButtons: [],
    nextQuestion: false,
  };

  async componentDidMount() {
    const questions = await getQuestions();
    this.setState({
      question: questions[0],
    }, () => {
      this.createAnswerButtons();
      this.handleTimer();
    });
  }

  handleAnswerButtonClick = () => {
    const buttons = document.querySelectorAll('.answer-button');
    buttons.forEach((button) => {
      button.style.border = (
        button.ariaLabel === 'correct-answer' ? (
          '3px solid rgb(6, 240, 15)'
        ) : '3px solid red'
      );
    });
    this.setState({ nextQuestion: true });
  };

  createAnswerButtons = () => {
    const { question } = this.state;
    if (question && Object.keys(question).length > 0) {
      const correctAnswerBtn = (
        <button
          data-testid="correct-answer"
          className="answer-button"
          dangerouslySetInnerHTML={ { __html: question.correct_answer } }
          aria-label="correct-answer"
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

  handleTimer = () => {
    const INTERVAL_TIME = 30000;
    setTimeout(() => {
      const answerButtons = document.querySelectorAll('.answer-button');
      answerButtons.forEach((button) => { button.disabled = true; });
    }, INTERVAL_TIME);
  };

  render() {
    const { question, randomAnswerButtons, nextQuestion } = this.state;
    if (question && Object.keys(question).length > 0) {
      return (
        <div>
          <Header />
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

export default Game;
