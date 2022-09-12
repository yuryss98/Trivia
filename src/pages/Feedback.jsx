import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  reedirectHome = () => {
    const { history: { push } } = this.props;
    push('/');
  };

  render() {
    return (
      <div>
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
};

export default Feedback;
