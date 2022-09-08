import React, { Component } from 'react';

export default class Login extends Component {
  state = {
    email: '',
    nameInput: '',
    isDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, () => {
      this.verifyButton();
    });
  };

  verifyButton = () => {
    const { nameInput, email } = this.state;

    if (nameInput.length && email.length) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  };

  render() {
    const { isDisabled, email, nameInput } = this.state;

    return (
      <div>
        <div>
          <h1 data-testid="settings-title">Configurações</h1>
          <button type="button" data-testid="btn-settings">Ir para configurações</button>

        </div>

        <form>
          <label htmlFor="nameInput">
            Nome:
            <input
              type="text"
              name="nameInput"
              value={ nameInput }
              onChange={ this.handleChange }
              id="nameInput"
              data-testid="input-player-name"
            />
          </label>

          <label htmlFor="email">
            Email:
            <input
              type="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
              id="email"
              data-testid="input-gravatar-email"
            />
          </label>

          <button
            type="button"
            disabled={ isDisabled }
            data-testid="btn-play"
          >
            Play

          </button>
        </form>
      </div>
    );
  }
}
