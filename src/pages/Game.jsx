import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Game extends Component {
  render() {
    const { email, name } = this.props;
    const avatarImage = md5(email).toString();
    return (
      <header>
        <img src={ `https://www.gravatar.com/avatar/${avatarImage}` } alt="imagem de perfil" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">Placar: 0</p>
      </header>
    );
  }
}

Game.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.getPlayer.name,
  email: state.getPlayer.gravatarEmail,
});

export default connect(mapStateToProps)(Game);
