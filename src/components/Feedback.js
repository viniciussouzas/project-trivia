import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const MAGIC_NUMBER = 3;

class Feedback extends Component {
  render() {
    const { correctAnswer } = this.props;
    return (
      <div>
        <p data-testid="feedback-text">
          {
            correctAnswer < MAGIC_NUMBER ? 'Could be better...' : 'Well done!'
          }
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.gameReducer,
});

Feedback.propTypes = {
  correctAnswer: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
