import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';

// estados
const BAD_STATE = {
  player: {
    name: 'Pedrinho Indomável123',
    assertions: 1,
    score: 31,
    gravatarEmail: '',
    email: '',
  }
};
const GOOD_STATE = {
  player: {
    name: 'Marina Barbieri',
    assertions: 5,
    score: 322,
    gravatarEmail: '',
    email: '',
  }
};

// test ids
const HEADER_PLAYER_TEST_ID = "header-player-name";
const HEADER_SCORE_TEST_ID = "header-score";
const FEEDBACK_ASSERTIONS_TEST_ID = "feedback-total-question";
const FEEDBACK_TEXT_TEST_ID = "feedback-text";
const FEEDBACK_SCORE_TEST_ID = "feedback-total-score";

describe('Testa a pagina de feedback', () => {
  test('Testa se o nome de usuário e sua foto são renderizados na pagina de feedback', () => {
    renderWithRouterAndRedux(<App/>, BAD_STATE, '/feedback');

    const nameUser = screen.getByTestId(HEADER_PLAYER_TEST_ID);
    const scoreUser = screen.getByTestId(HEADER_SCORE_TEST_ID);

    expect(nameUser).toBeInTheDocument();
    expect(scoreUser).toBeInTheDocument();  
  });

  test('Verifica se é renderizada uma mensagem relacionada ao desempenho da pessoa que jogou', () => {
    renderWithRouterAndRedux(<App/>, BAD_STATE, '/feedback');
    
    const feedbackText = screen.getAllByTestId(FEEDBACK_TEXT_TEST_ID);

    expect(feedbackText[0]).toHaveTextContent('Could be better...');
  });

  test('Verifica se a mensagem de feedback é alterada de acordo com o desempenho do jogador e se a quantidade de acertos e o score são exibidos', () => {
    renderWithRouterAndRedux(<App/>, GOOD_STATE, '/feedback');

    const feedbackText = screen.getAllByTestId(FEEDBACK_TEXT_TEST_ID);
    const feedbackScore = screen.getAllByTestId(FEEDBACK_SCORE_TEST_ID);
    const feedbackAssertions = screen.getAllByTestId(FEEDBACK_ASSERTIONS_TEST_ID);

    expect(feedbackText[0]).toHaveTextContent('Well Done!');
    expect(feedbackScore[0]).toHaveTextContent('322');
    expect(feedbackAssertions[0]).toHaveTextContent('5');  
  });

  test('Testa se os botões Play Again e Ranking são renderizados', () => {
    renderWithRouterAndRedux(<App/>, GOOD_STATE, '/feedback');

    const btnPlayAgain = screen.getByRole('button', { name: 'Play Again' });
    const btnRanking = screen.getByRole('button', { name: 'Ranking' });

    expect(btnPlayAgain).toBeInTheDocument();
    expect(btnRanking).toBeInTheDocument();
  });

  test('Testa se o jogador é redirecionado para a tela de login ao clicar no botão Play Again', () => {
    const { history } = renderWithRouterAndRedux(<App/>, GOOD_STATE, '/feedback');

    const btnPlayAgain = screen.getByRole('button', { name: 'Play Again' });
    userEvent.click(btnPlayAgain);

    expect(history.location.pathname).toBe('/');
  });

  test('Testa se o jogador é redirecionado ao clicar no botão Ranking', () => {
    const { history } = renderWithRouterAndRedux(<App/>, GOOD_STATE, '/feedback');

    const btnRanking = screen.getByRole('button', { name: 'Ranking' });
    userEvent.click(btnRanking);

    expect(history.location.pathname).toBe('/ranking');
  });
});
