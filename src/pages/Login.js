import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveLoginData } from '../redux/actions';
import { getToken } from '../services/fetchApi';

class Login extends Component {
  state = {
    name: '',
    email: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handlePlay = async () => {
    const token = await getToken();
    localStorage.setItem('token', token);
    const { history, dispatch } = this.props;
    const { name, email } = this.state;
    dispatch(saveLoginData(name, email));
    history.push('/game');
  };

  render() {
    const { name, email } = this.state;
    const { history } = this.props;
    const isValid = name && email;

    return (
      <div>
        <input
          name="name"
          type="text"
          value={ name }
          placeholder="Insira seu nome"
          onChange={ this.handleChange }
          data-testid="input-player-name"
        />
        <input
          name="email"
          type="email"
          value={ email }
          placeholder="Insira seu e-mail"
          onChange={ this.handleChange }
          data-testid="input-gravatar-email"
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ !isValid }
          onClick={ this.handlePlay }
        >
          Play
        </button>
        <button
          data-testid="btn-settings"
          onClick={ () => history.push('/settings') }
        >
          Settings
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
