import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetScore } from '../redux/actions';

class Ranking extends Component {
  state = {
    players: [],
  };

  componentDidMount() {
    const storagePlayers = JSON.parse(localStorage.getItem('ranking')) || [];
    const sortedPlayers = storagePlayers.sort((a, b) => b.score - a.score);
    this.setState({ players: sortedPlayers });
  }

  backToHome = () => {
    const { history: { push }, dispatch } = this.props;
    dispatch(resetScore());
    push('/');
  };

  render() {
    const { players } = this.state;
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        {players.length && (
          <div>
            {players.map(({ name, picture, score }, index) => (
              <div key={ index }>
                <img src={ picture } alt={ name } />
                <p data-testid={ `player-name-${index}` }>{name}</p>
                <p data-testid={ `player-score-${index}` }>{score}</p>
              </div>
            ))}
          </div>
        )}
        <button
          type="button"
          data-testid="btn-go-home"
          on
          onClick={ this.backToHome }
        >
          Voltar
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Ranking);
