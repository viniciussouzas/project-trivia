/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import Header from '../components/Header';
import { getQuestions } from '../services/fetchApi';

class Game extends Component {
  state = {
    question: {},
  };

  async componentDidMount() {
    const questions = await getQuestions();
    this.setState({
      question: questions[0],
    });
  }

  createButtons = () => {
    const { question } = this.state;
    const correctAnswerBtn = (
      <button
        data-testid="correct-answer"
        dangerouslySetInnerHTML={ { __html: question.correct_answer } }
        aria-label="correct-answer"
      />
    );
    const incorrectAnswersBtns = (
      question.incorrect_answers.map((answer, index) => (
        <button
          data-testid={ `wrong-answer-${index}` }
          key={ index }
          dangerouslySetInnerHTML={ { __html: answer } }
          aria-label="incorrect-answer"
        />
      ))
    );
    const buttons = [correctAnswerBtn, ...incorrectAnswersBtns];
    return buttons;
  };

  sortButtons = () => {
    const buttons = this.createButtons();
    const randomComparator = 0.5;
    const randomButtons = buttons.sort(() => Math.random() - randomComparator);
    return randomButtons;
  };

  render() {
    const { question } = this.state;
    if (question && Object.keys(question).length > 0) {
      const buttons = this.sortButtons();
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
            buttons.map((button, index) => (
              <div
                key={ index }
                data-testid="answer-options"
              >
                {button}
              </div>

            ))
          }
        </div>
      );
    }
    return <div>Loading...</div>;
  }
}

export default Game;
