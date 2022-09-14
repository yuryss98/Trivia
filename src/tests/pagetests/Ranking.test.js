import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { RANKING_BTN_HOME } from "./helpers";

export const INITIAL_STATE = {
  player: {
    name: 'João montador de Yoshi',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
    email: '',
  }
}

describe('Testa a pagina de Ranking', () => {
  test('', () => {
    const { history } = renderWithRouterAndRedux(<App/>, FIRST_STATE, '/ranking');

    const homeButton = screen.getByTestId(RANKING_BTN_HOME);
    userEvent.click(homeButton);

    expect(history.location.pathname).toBe('/');
  });
});
