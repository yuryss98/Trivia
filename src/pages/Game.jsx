import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getQuestions } from '../helpers/services';
import '../answers.css';
import { setScore } from '../redux/actions';
import Header from '../components/Header';

const MIN_SECONDS = 1000;

class Game extends Component {
  state = {
    index: 0,
    questions: [],
    assertions: 0,
    nextQuestion: false,
    correctAnswer: '',
    shuffledArray: [],
    countDown: 30,
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
    const { index } = this.state;
    const { questions } = this.state;

    if (index !== questions.length - 1) {
      this.setState((prevState) => ({
        index: prevState.index + 1,
        nextQuestion: false,
        countDown: 30,
        disabled: false,
      }), () => {
        this.generateQuestions(questions);
      });
    } else {
      const { history } = this.props;
      history.push('/feedback');
    }
  };

  getDifficulty = (difficulty) => {
    const hard = 3;
    switch (difficulty) {
    case 'easy':
      return 1;

    case 'medium':
      return 2;

    default: return hard;
    }
  };

  setColor = (question, correctAnswer, difficulty) => {
    const difficultyValue = this.getDifficulty(difficulty);
    if (question === correctAnswer) {
      const { dispatch } = this.props;
      const { countDown } = this.state;
      const number = 10;
      const points = number + (countDown * difficultyValue);
      this.setState(({ assertions }) => ({
        assertions: assertions + 1,
      }), () => {
        const { assertions } = this.state;
        dispatch(setScore(points, assertions));
      });
    }

    this.setState({
      nextQuestion: true,
    });
  };

  timer = () => {
    this.setState(({ countDown }) => ({
      countDown: countDown - 1,
    }), () => {
      const { countDown } = this.state;

      if (countDown === 0) {
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
      countDown,
      disabled,
    } = this.state;

    return (

      <div>
        <Header />

        <p>{countDown}</p>
        {
          questions.length && (

            <div>
              <h3 data-testid="question-category">{questions[index].category}</h3>

              <p data-testid="question-text">{questions[index].question}</p>

              <div data-testid="answer-options">

                {shuffledArray.map((question, numIndex) => {
                  const { difficulty } = questions[index];
                  if (question === correctAnswer) {
                    return (
                      <button
                        className={ nextQuestion && 'correctAnswer' }
                        key={ question }
                        type="button"
                        onClick={ () => (
                          this.setColor(question, correctAnswer, difficulty)) }
                        data-testid="correct-answer"
                        disabled={ disabled }
                      >
                        { question }
                      </button>
                    );
                  }
                  return (
                    <button
                      className={ nextQuestion && 'incorrectAnswers' }
                      key={ question }
                      type="button"
                      onClick={ () => (
                        this.setColor(question, correctAnswer, difficulty)) }
                      data-testid={ `wrong-answer-${numIndex}` }
                      disabled={ disabled }
                    >
                      {question}
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Game);
