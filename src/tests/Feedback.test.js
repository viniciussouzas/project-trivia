import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testes para a tela de Feedback', () => {
  it('Verifica se os elementos são renderizados corretamente na tela', () => {
    const initialState = {
      player: {
        score: 200,
        name: 'Joao',
        gravatarEmail: 'joao@gmail.com',
        assertions: 4,
      }
    }

    renderWithRouterAndRedux(<App />, {initialEntries: ['/feedback'], initialState });

    const userName = screen.getByTestId("header-player-name");
    expect(userName).toBeInTheDocument();
  })
})