import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  backToHome = () => {
    const { history: { push } } = this.props;
    push('/');
  };

  render() {
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
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
};

export default Ranking;
