// import { screen, waitForElementToBeRemoved } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import App from '../../App';
// import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';
// import mockData from '../mock';

// let globalHistory;

// describe('testando pagina de game', () => {
//   beforeEach(() => {
//     global.fetch = jest.fn(() => Promise.resolve({
//       json: () => Promise.resolve(mockData),
//     }));


//     const { history } = renderWithRouterAndRedux(<App />);
//     globalHistory = history;

//     const inputName = screen.getByTestId('input-player-name');
//     const inputEmail = screen.getByTestId('input-gravatar-email');
//     const buttonPlay = screen.getByRole('button', { name: 'Play' });

//     userEvent.type(inputName, 'xablau');
//     userEvent.type(inputEmail, 'xablau@xablau.com');
//     userEvent.click(buttonPlay);
//   });

//   it('Testando se aparece Nome do usuario, email, e sua imagem', () => {
//     expect(globalHistory.location.pathname).toBe('/game');
//     const nameUser = screen.getByText('xablau')
//     const gravatarUser = screen.getByRole('img');
//     const score = screen.getByRole('heading', { level: 1, name: 0 })
//     const btnNext = screen.queryByRole('button', { name: 'Next'});

//     expect(nameUser).toBeInTheDocument();
//     expect(gravatarUser).toBeInTheDocument();
//     expect(score).toBeInTheDocument();
//     expect(btnNext).not.toBeInTheDocument();

//     const category = screen.getByRole('heading', { level: 3, name: 'Entertainment: Video Games' })
//     const question1 = screen.getByRole('button', { name: 'Gauntlet' })
//     const question2 = screen.getByRole('button', { name: 'Pac-Man' })
//     const question3 = screen.getByRole('button', { name: 'Space Invaders' })
//     const question4 = screen.getByRole('button', { name: 'Street Fighter' })
//     expect(question1).toBeInTheDocument();
//     expect(question2).toBeInTheDocument();
//     expect(question3).toBeInTheDocument();
//     expect(question4).toBeInTheDocument();
//     expect(category).toBeInTheDocument()

//     userEvent.click(question2)

//     const scoreAtt = screen.getByRole('heading', { level: 1, name: 40 })
//     const btnNext2 = screen.queryByRole('button', { name: 'Next'});
//     expect(scoreAtt).toBeInTheDocument();
//     expect(btnNext2).toBeInTheDocument();

//     userEvent.click(btnNext2);
    
//     const category2 = screen.queryByRole('heading', { level: 3, name: 'Entertainment: Video Games' })
//     expect(category2).not.toBeInTheDocument()

//     const newCategory = screen.queryByRole('heading', { level: 3, name: 'Entertainment: Music' })
//     const newQuestion1 = screen.getByRole('button', { name: 'Evil Empire' })
//     const newQuestion2 = screen.getByRole('button', { name: 'Bombtrack' })
//     const newQuestion3 = screen.getByRole('button', { name: 'The Battle Of Los Angeles' })
//     const newQuestion4 = screen.getByRole('button', { name: 'Rage Against the Machine' })

//     expect(newCategory).toBeInTheDocument();
//     expect(newQuestion1).toBeInTheDocument();
//     expect(newQuestion2).toBeInTheDocument();
//     expect(newQuestion3).toBeInTheDocument();
//     expect(newQuestion4).toBeInTheDocument();

//     userEvent.click(newQuestion4)

//     const newScore = screen.getByRole('heading', { level: 1, name: 80 })
//     expect(newScore).toBeInTheDocument();
//   })
// });


import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';
import App from '../../App';
const { questionsResponse, invalidTokenQuestionsResponse } = require('../mocks/questions');

describe('Testa o componente <Game />', () => {
  const EMAIL_INPUT_TEST_ID = 'input-gravatar-email';
  const NAME_INPUT_TEST_ID = 'input-player-name';
  const PLAY_BUTTON_TEST_ID = 'btn-play';

  const INITIAL_STATE = {
    player: {
      name: 'alguém',
      assertions: 0,
      gravatarEmail: 'alguem@alguem.com',
      score: 0,
    }
  };
  test('Testa se, ao receber erro da API, retorna ao inicio', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(invalidTokenQuestionsResponse),
    }));

    localStorage.setItem('token', 'aaaa');
    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');
    expect(history.location.pathname).toBe('/game');

    await waitFor(() => expect(history.location.pathname).toBe('/'))
  });

  test('Testa se o jogo renderiza as perguntas', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(questionsResponse),
    }));

    const { history } = renderWithRouterAndRedux(<App />);
    const playButton = screen.getByTestId(PLAY_BUTTON_TEST_ID);
    const emailInput = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const nameInput = screen.getByTestId(NAME_INPUT_TEST_ID);

    userEvent.type(emailInput, 'usuario@usuario.com');
    userEvent.type(nameInput, 'usuario');
    userEvent.click(playButton);

    const question = await screen.findByTestId('question-text')

    await waitFor(() => expect(question).toBeInTheDocument())
  });

  test('Testa se o botao nao esta na pagina inicialmente, mas aparece ao responder', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(questionsResponse),
    }));

    const { history } = renderWithRouterAndRedux(<App />);
    const playButton = screen.getByTestId(PLAY_BUTTON_TEST_ID);
    const emailInput = screen.getByLabelText(/email/i);
    const nameInput = screen.getByTestId(NAME_INPUT_TEST_ID);
    userEvent.type(emailInput, 'usuario@usuario.com');
    userEvent.type(nameInput, 'usuario');
    userEvent.click(playButton);
    const question = await screen.findByText(/The Republic of Malta is the smallest microstate worldwide./i);
    const nextButtonBefore = screen.queryByTestId('btn-next');
    expect(nextButtonBefore).not.toBeInTheDocument();
    const answer = screen.getByTestId('correct-answer');
    expect(answer).toBeInTheDocument();
    userEvent.click(answer);
    const nextButtonAfter = await screen.findByTestId('btn-next');
    expect(nextButtonAfter).toBeInTheDocument();
  });

  test('Testa se, ao responder as 5, o jogo termina', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(questionsResponse),
    }));

    const { history } = renderWithRouterAndRedux(<App />);
    const playButton = screen.getByTestId(PLAY_BUTTON_TEST_ID);
    const emailInput = screen.getByLabelText(/email/i);
    const nameInput = screen.getByTestId(NAME_INPUT_TEST_ID);
    userEvent.type(emailInput, 'usuario@usuario.com');
    userEvent.type(nameInput, 'usuario');
    userEvent.click(playButton);
    const question = await screen.findByText(/The Republic of Malta is the smallest microstate worldwide./i);
    const answer = screen.getByTestId('correct-answer');
    userEvent.click(answer);
    const nextButtonAfter = await screen.findByTestId('btn-next');
    userEvent.click(nextButtonAfter);
    const answer2 = screen.getByTestId('correct-answer');
    userEvent.click(answer2);
    const nextButtonAfter2 = await screen.findByTestId('btn-next');
    userEvent.click(nextButtonAfter2);
    const answer3 = screen.getByTestId('correct-answer');
    userEvent.click(answer3);
    const nextButtonAfter3 = await screen.findByTestId('btn-next');
    userEvent.click(nextButtonAfter3);
    const answer4 = screen.getByTestId('correct-answer');
    userEvent.click(answer4);
    const nextButtonAfter4 = await screen.findByTestId('btn-next');
    userEvent.click(nextButtonAfter4);
    const answer5 = screen.getByTestId('correct-answer');
    userEvent.click(answer5);
    const nextButtonAfter5 = await screen.findByTestId('btn-next');
    userEvent.click(nextButtonAfter5);
    
    await waitFor(() => {
      expect(history.location.pathname).toBe('/feedback')
    });
  });

  jest.setTimeout(40000);

  test('Testa se ao demorar 30 segundos, nao pode responder', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(questionsResponse),
    }));

    const { history } = renderWithRouterAndRedux(<App />);
    const playButton = screen.getByTestId(PLAY_BUTTON_TEST_ID);
    const emailInput = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const nameInput = screen.getByTestId(NAME_INPUT_TEST_ID);
    userEvent.type(emailInput, 'usuario@usuario.com');
    userEvent.type(nameInput, 'usuario');
    userEvent.click(playButton);
    const question = await screen.findByText(/The Republic of Malta is the smallest microstate worldwide./i);
    const answer = screen.getByTestId('correct-answer');
    expect(answer).toBeEnabled();
    
    await waitFor(() => expect(answer).not.toBeEnabled(), {
      timeout: 31000,
    })
  });

  test('Testa se ao responder errado ele indica o erro', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(questionsResponse),
    }));

    const { history } = renderWithRouterAndRedux(<App />);
    const playButton = screen.getByTestId(PLAY_BUTTON_TEST_ID);
    const emailInput = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const nameInput = screen.getByTestId(NAME_INPUT_TEST_ID);

    userEvent.type(emailInput, 'usuario@usuario.com');
    userEvent.type(nameInput, 'batman');
    userEvent.click(playButton);
    
    const question = await screen.findByTestId('question-text')
    const wrongAnswer = screen.getByTestId('wrong-answer-0');
    userEvent.click(wrongAnswer);

    await waitFor(() => expect(wrongAnswer.className).toBe("incorrectAnswers"))
  });
});
