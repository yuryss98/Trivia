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

  shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  requestError = () => {
    const { history } = this.props;
    localStorage.removeItem('token');
    history.push('/');
  };

  // updateIndex = () => {
  //   this.setState(({ index }) => ({
  //     index: index + 1,
  //   }));
  // };

  setColor = ({ target }) => {
    const getElement = target.getAttribute('data-getElementid');
    const getParent = target.parentElement;
    const getChildren = getParent.children;

    for (let i = 0; i < getChildren.length; i += 1) {
      getChildren[i].style.border = '3px solid red';
    }

    const correctAnswer = 'correct-answer';

    if (getElement === correctAnswer) {
      target.style.border = '3px solid rgb(6, 240, 15)';
    } else {
      for (let i = 0; i < getChildren.length; i += 1) {
        if (getChildren[i].getAttribute('data-testid') === correctAnswer) {
          getChildren[i].style.border = '3px solid rgb(6, 240, 15)';
        }
      }
    }
  };

  render() {
    const { questions, index } = this.state;
    const { email, name } = this.props;
    const avatarImage = md5(email).toString();

    return (

      <div>
        <header>
          <img
            src={ `https://www.gravatar.com/avatar/${avatarImage}` }
            alt="imagem de perfil"
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">{ name }</p>
          <p data-testid="header-score">Placar: 0</p>
        </header>
        {
          questions.length && (

            <div>
              <h3 data-testid="question-category">{questions[index].category}</h3>

              <p data-testid="question-text">{questions[index].question}</p>

              <div data-testid="answer-options">

                {questions.map((_, numIndex) => {
                  if (numIndex === index) {
                    const wrongAnswers = [...questions[index].incorrect_answers];
                    const answers = [...wrongAnswers, questions[index].correct_answer];
                    const correctAnswer = answers[answers.length - 1];
                    const newQuestions = this.shuffleArray(answers);
                    return newQuestions.map((question) => {
                      if (question === correctAnswer) {
                        return (
                          <button
                            type="button"
                            onClick={ this.setColor }
                            data-testid="correct-answer"
                          >
                            {questions[index].correct_answer}
                          </button>
                        );
                      }
                      return (
                        <button
                          key={ question }
                          type="button"
                          onClick={ this.setColor }
                          data-testid={ `wrong-answer-${numIndex}` }
                        >
                          {question}
                        </button>
                      );
                    });
                  }
                  return null;
                })}
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
