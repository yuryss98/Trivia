import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { getQuestions } from '../helpers/services';

class Game extends Component {
  state = {
    index: 0,
    questions: [],
  };

  async componentDidMount() {
    this.verifyResponseCode();
  }

  verifyResponseCode = async () => {
    const response = await getQuestions();
    const { response_code: responseCode, results } = response;
    const ERROR_REQUEST_CODE = 3;
    if (responseCode === ERROR_REQUEST_CODE) {
      return this.requestError();
    }

    this.setState({
      questions: results,
    });
  };

  requestError = () => {
    const { history } = this.props;
    localStorage.removeItem('token');
    history.push('/');
  };

  updateIndex = () => {
    this.setState(({ index }) => ({
      index: index + 1,
    }));
  };

  render() {
    const { questions, index } = this.state;
    const { email, name } = this.props;
    const avatarImage = md5(email).toString();

    return (

      <div>
        <header>
          <img src={ `https://www.gravatar.com/avatar/${avatarImage}` } alt="imagem de perfil" data-testid="header-profile-picture" />
          <p data-testid="header-player-name">{ name }</p>
          <p data-testid="header-score">Placar: 0</p>
        </header>
        {
          questions.length && (

            <div>
              <h3 data-testid="question-category">{questions[index].category}</h3>

              <p data-testid="question-text">{questions[index].question}</p>

              <div data-testid="answer-options">

                {questions[index].incorrect_answers.map((item, numIndex) => (
                  <button
                    key={ item }
                    type="button"
                    onClick={ this.updateIndex }
                    data-testid={ `wrong-answer-${numIndex}` }
                  >
                    {item}
                  </button>))}

                <button
                  type="button"
                  onClick={ this.updateIndex }
                  data-testid="correct-answer"
                >
                  {questions[index].correct_answer}
                </button>
              </div>
            </div>
          )
        }

      </div>
    );
  }
}

Game.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  name: state.getPlayer.name,
  email: state.getPlayer.gravatarEmail,
});

export default connect(mapStateToProps)(Game);
