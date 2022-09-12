import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends Component {
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
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
