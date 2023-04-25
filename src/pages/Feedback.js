import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

const MAGIC_NUMBER = 3;

class Feedback extends Component {
  render() {
    const { correctAnswer, history } = this.props;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          {
            correctAnswer < MAGIC_NUMBER ? 'Could be better...' : 'Well Done!'
          }
        </p>
        <button
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.player,
});

Feedback.propTypes = {
  correctAnswer: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
