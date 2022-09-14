import renderWithRouterAndRedux from "../helpers/renderWithRouterAndRedux";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
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

    const nameToInput = 'batman pacífico'
    const emailToInput = 'amigodosvizinhos@gmail.com'

    const nameInput = screen.getByTestId('input-player-name')
    const emailInput = screen.getByTestId('input-gravatar-email')
    const playButton = screen.getByTestId('btn-play')

    userEvent.type(nameInput, nameToInput)
    userEvent.type(emailInput, emailToInput)

    expect(playButton).toBeEnabled()
  })

  test('Testa se ao clicar no Botão Settings é redirecionado para a página de Configurações', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    userEvent.click(screen.getByTestId('btn-settings'));
    expect(history.location.pathname).toBe('/settings');
  });

  test('Testa se ao clicar no Botão play, o usuário é redirecionado para a página de Games', async () => {
    const { history } = renderWithRouterAndRedux(<App />)

    const nameToInput = 'batman pacífico'
    const emailToInput = 'amigodosvizinhos@gmail.com'

    const nameInput = screen.getByTestId('input-player-name')
    const emailInput = screen.getByTestId('input-gravatar-email')
    const playButton = screen.getByTestId('btn-play')

    userEvent.type(nameInput, nameToInput)
    userEvent.type(emailInput, emailToInput)
    userEvent.click(playButton)

    await waitFor(() => {
      expect(history.location.pathname).toBe('/game')
    }); 
  })
});
