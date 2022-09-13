import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { resetScore } from '../redux/actions';

class Feedback extends Component {
  redirectHome = () => {
    const { history: { push }, dispatch } = this.props;

    dispatch(resetScore());
    push('/');
  };

  goToRanking = () => {
    const { history: { push } } = this.props;
    push('/ranking');
  };

  render() {
    const { assertions, score } = this.props;
    const THREE = 3;
    return (
      <div>
        <Header />
        <h3 data-testid="feedback-total-question">{ assertions }</h3>
        <h3 data-testid="feedback-total-score">{ score }</h3>

        {assertions < THREE ? (
          <h3 data-testid="feedback-text">Could be better...</h3>
        ) : (
          <h3 data-testid="feedback-text">Well Done!</h3>
        )}

        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.redirectHome }
        >
          Play Again

        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.goToRanking }
        >
          Ranking

        </button>

      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
