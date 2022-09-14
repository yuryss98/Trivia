import React from "react";
import renderWithRouterAndRedux from "../helpers/renderWithRouterAndRedux";
import userEvent from "@testing-library/user-event";
import { screen, waitFor } from "@testing-library/react";
import App from '../../App'

describe('Testa formulário da página de Login', () => {
  test('Testa se existem inputs de email e senha', () => {
    renderWithRouterAndRedux(<App />)

    const nameInput = screen.getByTestId('input-player-name')
    const emailInput = screen.getByTestId('input-gravatar-email')

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
  });

  test('Testa se existe um botão e se ele está desabilitado inicialmente', () => {
    renderWithRouterAndRedux(<App />)

    const playButton = screen.getByTestId('btn-play')

    expect(playButton).toBeInTheDocument();
    expect(playButton).toBeDisabled()
  })

  test('Testa se quando email e senha forem preenchidos, o botão é habilitado', () => {
    renderWithRouterAndRedux(<App />)

    const nameToInput = 'batman'
    const emailToInput = 'amigodosvizinhos@gmail.com'

    const nameInput = screen.getByTestId('input-player-name')
    const emailInput = screen.getByTestId('input-gravatar-email')
    const playButton = screen.getByTestId('btn-play')

    userEvent.type(nameInput, nameToInput)
    userEvent.type(emailInput, emailToInput)

    expect(playButton).toBeEnabled()
  })

  test('Testa se ao clicar no Botão play, o usuário é redirecionado para a página de Games', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const playButton = screen.getByRole('button', { name: /play/i });
    const emailInput = screen.getByTestId('input-gravatar-email')
    const nameInput = screen.getByLabelText(/nome/i);

    expect(playButton).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();

    userEvent.type(emailInput, 'usuario@usuario.com');
    userEvent.type(nameInput, 'usuario');

    expect(playButton).not.toBeDisabled();

    userEvent.click(playButton);

    setTimeout(() => {
      expect(history.location.pathname).toBe('/game')
    }, 2000);
  });
});
