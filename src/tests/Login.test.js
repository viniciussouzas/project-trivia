import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';



describe('Testes para a tela de Login', () => {
  it('Verifica se os inputs e os botões são renderizados corretamente', () => {
    renderWithRouterAndRedux(<App />);
    const usernameInput = screen.getByTestId('input-player-name');
    const userEmail = screen.getByTestId('input-gravatar-email');
    const playButton = screen.getByTestId('btn-play');
    const settingsButton = screen.getByTestId('btn-settings');

    expect(usernameInput).toBeInTheDocument();
    expect(userEmail).toBeInTheDocument();
    expect(playButton).toBeInTheDocument();
    expect(settingsButton).toBeInTheDocument();
  });

  it('Verifica se o botão Play é habilitado ao inserir informações nos campos de nome e e-mail', () => {
    renderWithRouterAndRedux(<App />);
    const usernameInput = screen.getByTestId('input-player-name');
    const userEmail = screen.getByTestId('input-gravatar-email');
    const playButton = screen.getByTestId('btn-play');

    expect(playButton).toBeDisabled();

    const nameTest = 'Joaquina';
    const emailTest = 'joaquina123@gmail.com';

    userEvent.type(usernameInput, nameTest);
    expect(playButton).toBeDisabled();

    userEvent.type(userEmail, emailTest);
    expect(playButton).toBeEnabled();
  });

  it('Verifica se ao clicar no botão Play, o usuário é redirecionado para a página "/game"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const nameInput = screen.getByPlaceholderText('Insira seu nome');
    const emailInput = screen.getByPlaceholderText('Insira seu e-mail');
    const playBtn = screen.getByRole('button', { name: 'Play' });

    userEvent.type(nameInput, 'teste');
    userEvent.type(emailInput, 'teste');
    userEvent.click(playBtn);

    const { pathname } = history.location;
    waitFor(() => {
      expect(pathname).toBe('/game');
    });
  });

  it('Verifica se ao clicar no botão Settings, o usuário é redirecionado para a página "/settings', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    userEvent.click(screen.getByTestId('btn-settings'));

    const { pathname } = history.location;
    expect(pathname).toBe('/settings');
  });

  it('Verifica se o token é recebido pela API ao clicar no botão Play', async () => {
    renderWithRouterAndRedux(<App />);
    const nameInput = screen.getByPlaceholderText('Insira seu nome');
    const emailInput = screen.getByPlaceholderText('Insira seu e-mail');
    const playBtn = screen.getByRole('button', { name: 'Play' });

    userEvent.type(nameInput, 'teste');
    userEvent.type(emailInput, 'teste');
    

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        "response_code":0,
        "response_message":"Token Generated Successfully!",
        "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
      }),
    });

    userEvent.click(playBtn);

    waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledWith('https://opentdb.com/api_token.php?command=request');
      expect(localStorage.getItem('token')).toBe('f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6')
    })
  });

})