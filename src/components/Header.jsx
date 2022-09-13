import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { email, name, score } = this.props;
    const avatarImage = md5(email).toString();
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${avatarImage}` }
          alt="imagem de perfil"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ name }</p>
        <h1 data-testid="header-score">
          {' '}
          { score }
          {' '}
        </h1>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
