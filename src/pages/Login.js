import { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
  state = {
    name: '',
    email: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  getToken = async () => {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    return data.token;
  };

  handlePlay = async () => {
    const token = await this.getToken();
    const { history } = this.props;
    history.push('/game');
    localStorage.setItem('token', token);
    console.log(token);
  };

  render() {
    const { name, email } = this.state;

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
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
