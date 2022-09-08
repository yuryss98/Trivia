import React from 'react';
import { connect } from 'react-redux';
import { md5 } from 'crypto-js/md5';

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

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Game);
