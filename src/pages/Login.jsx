import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getToken } from '../helpers/services';
import { userInfoAction } from '../redux/actions';

class Login extends Component {
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

  handleSubmit = async (e) => {
    e.preventDefault();

    const { dispatch, history: { push } } = this.props;
    const { nameInput, email } = this.state;

    await getToken();

    dispatch(userInfoAction(nameInput, email));
    push('/game');
  };

  render() {
    const { isDisabled, email, nameInput } = this.state;

    return (
      <div>
        <div>
          <h1 data-testid="settings-title">Configurações</h1>
          <button type="button" data-testid="btn-settings">Ir para configurações</button>
        </div>

        <form onSubmit={ this.handleSubmit }>
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
            type="submit"
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

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
