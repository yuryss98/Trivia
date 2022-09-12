import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { getQuestions } from '../helpers/services';
import '../answers.css';

const MIN_SECONDS = 1000;

class Game extends Component {
  state = {
    index: 0,
    questions: [],
    nextQuestion: false,
    correctAnswer: '',
    shuffledArray: [],
    coutdown: 30,
    disabled: false,
  };

  componentDidMount() {
    this.verifyResponseCode();
    this.intervalFunc();
  }

  verifyResponseCode = async () => {
    const response = await getQuestions();
    const { response_code: responseCode, results } = response;
    const CORRECT_REQUEST_CODE = 0;
    console.log(response);
    if (responseCode !== CORRECT_REQUEST_CODE) {
      this.requestError();
    } else {
      this.setState({
        questions: results,
      });
      this.generateQuestions(results);
    }
  };

  generateQuestions = (results) => {
    const { index } = this.state;
    const wrongAnswers = [...results[index].incorrect_answers];
    const answers = [...wrongAnswers, results[index].correct_answer];
    const correctAnswer = answers[answers.length - 1];
    const newQuestions = this.shuffleArray(answers);

    this.setState({
      correctAnswer,
      shuffledArray: newQuestions,
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

  updateIndex = () => {
    this.setState(({ index }) => ({
      index: index + 1,
      nextQuestion: false,
      coutdown: 30,
      disabled: false,
    }));

    const { questions } = this.state;

    this.generateQuestions(questions);
  };

  setColor = () => {
    this.setState({
      nextQuestion: true,
    });
  };

  timer = () => {
    this.setState(({ coutdown }) => ({
      coutdown: coutdown - 1,
    }), () => {
      const { coutdown } = this.state;

      if (coutdown === 0) {
        this.setState({
          disabled: true,
        });
      }
    });
  };

  intervalFunc = () => {
    setInterval(() => {
      this.timer();
    }, MIN_SECONDS);
  };

  render() {
    const {
      questions,
      shuffledArray,
      correctAnswer,
      index,
      nextQuestion,
      coutdown,
      disabled,
    } = this.state;
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

        <p>{coutdown}</p>
        {
          questions.length && (

            <div>
              <h3 data-testid="question-category">{questions[index].category}</h3>

              <p data-testid="question-text">{questions[index].question}</p>

              <div data-testid="answer-options">

                {shuffledArray.map((questao, numIndex) => {
                  if (questao === correctAnswer) {
                    return (
                      <button
                        className={ nextQuestion && 'correctAnswer' }
                        type="button"
                        onClick={ this.setColor }
                        data-testid="correct-answer"
                        disabled={ disabled }
                      >
                        { questao }
                      </button>
                    );
                  }
                  return (
                    <button
                      className={ nextQuestion && 'incorrectAnswers' }
                      key={ questao }
                      type="button"
                      onClick={ this.setColor }
                      data-testid={ `wrong-answer-${numIndex}` }
                      disabled={ disabled }
                    >
                      {questao}
                    </button>
                  );
                })}
              </div>
            </div>
          )
        }

        {
          nextQuestion && (
            <div>
              <button
                data-testid="btn-next"
                type="button"
                onClick={ this.updateIndex }
              >
                Next

              </button>
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
