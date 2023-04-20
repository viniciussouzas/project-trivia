import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Game extends Component {
  render() {
    const { questions } = this.props;

    if (!questions.length) return <p>Loading...</p>;

    return (
      <div>
        <Header />
        <p data-testid="question-category">{questions[0].category}</p>
        <p data-testid="question-text">{questions[0].question}</p>
        { questions[0].type === 'multiple' ? (
          <div>
            <button>{questions[0].correct_answer}</button>
            <button>{questions[0][incorrect_answer][0]}</button>
            <button>{questions[0][incorrect_answer][1]}</button>
            <button>{questions[0][incorrect_answer][2]}</button>
          </div>
        ) : (
          <button>Boolean</button>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.gameReducer.questions,
});

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default connect(mapStateToProps)(Game);
