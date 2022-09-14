import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux'
import App from '../../App';

describe('Testa a pagina Ranking', () => {
  const INITIAL_STATE = {
    player: {
      name: 'raposaAnonima',
      assertions: 0,
      gravatarEmail: 'alo@alguem.com',
      score: 0,
    }
  };
  localStorage.setItem('ranking', JSON.stringify([
    {
      name: 'bill',
      score: 30,
      picture: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
    },
    {
      name: 'filhoDoBill',
      score: 80,
      picture: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
    },
    {
      name: 'mulherDoBill',
      score: 5,
      picture: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
    },
  ]));
  test('Testa se o ranking renderiza corretamente', async () => {
    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/ranking');
    expect(history.location.pathname).toBe('/ranking');
    const rankingTitle = await screen.findByText(/ranking/i);
    expect(rankingTitle).toBeInTheDocument();
    const firstPlace = screen.queryByTestId('player-name-0');
    expect(firstPlace).toHaveTextContent('filhoDoBill');
  });

  test('Testa se o botao de jogar novamente aparece', async () => {
    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/ranking');
    expect(history.location.pathname).toBe('/ranking');

    const playAgainButton = await screen.findByTestId('btn-go-home');
    expect(playAgainButton).toBeInTheDocument();
    
    userEvent.click(playAgainButton);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/'),
      {timeout: 2000 };
    });
  });
});
