import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { saveQuestionsThunk } from '../redux/actions';

class Game extends Component {
  async componentDidMount() {
    const { dispatch } = this.props;

    dispatch(saveQuestionsThunk());
  }

  render() {
    const { questions } = this.props;
    console.log(questions);
    return (
      <div>
        <Header />
        {
          questions.map((question, index) => (
            <div key={ index }>
              <p>{question.category}</p>
            </div>
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.gameReducer.questions,
});

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default connect(mapStateToProps)(Game);
