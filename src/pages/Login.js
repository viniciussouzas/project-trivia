import { Component } from 'react';

class Login extends Component {
  state = {
    name: '',
    email: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
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
        >
          Play
        </button>
      </div>
    );
  }
}

export default Login;
