import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  reedirectHome = () => {
    const { history: { push } } = this.props;
    push('/');
  };

  render() {
    const { assertions } = this.props;
    const THREE = 3;
    return (
      <div>

        {assertions < THREE ? (
          <h1 data-testid="feedback-text">Could be better...</h1>
        ) : (
          <h1 data-testid="feedback-text">Well Done!</h1>
        )}

        <Header />
        <h1 data-testid="feedback-text">Feedback</h1>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.reedirectHome }
        >
          Play Again

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
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
