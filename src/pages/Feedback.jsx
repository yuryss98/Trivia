import React, { Component } from 'react';

class Feedback extends Component {
  reedirectHome = () => {
    const { history: { push } } = this.props;
    push('/');
  };

  render() {
    return (
      <div>
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

export default Feedback;
