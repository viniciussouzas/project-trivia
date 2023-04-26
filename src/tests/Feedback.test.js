import userEvent from "@testing-library/user-event"
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import { screen } from '@testing-library/react'
import App from '../App'

describe('Testes para a página de Feedback', () => {

  it('Verifica se os elementos são renderizados corretamente na tela', () => {
    renderWithRouterAndRedux(<App />, '', '/feedback')
    const headerImg = screen.getByRole('img');
    const headerScore = screen.getByTestId('header-score');
    const feedbackScore = screen.getByTestId('feedback-total-score');
    const assertions = screen.getByTestId('feedback-total-question');
    const feedbackHeader = screen.getByText(/could be better\.\.\./i);
    const btnPlayAgain = screen.getByRole('button', { name: /play again/i });
    const btnRanking = screen.getByRole('button', { name: /ranking/i });

    expect(headerImg).toBeInTheDocument();
    expect(headerScore).toBeInTheDocument();
    expect(feedbackScore).toBeInTheDocument();
    expect(assertions).toBeInTheDocument();
    expect(feedbackHeader).toBeInTheDocument();
    expect(btnPlayAgain).toBeInTheDocument();
    expect(btnRanking).toBeInTheDocument();
  })

  it('Verifica o redirecionamento da tela de feedback para login', () => {
    const { history } = renderWithRouterAndRedux(<App />, '', '/feedback')

    const btnPlayAgain = screen.getByRole('button', { name: /play again/i });
  
    userEvent.click(btnPlayAgain)

    const { pathname } = history.location

    expect(pathname).toBe('/')
  })

  it('Verifica redirecionamento da tela de feedback para Ranking', () => {
    const { history } = renderWithRouterAndRedux(<App />, '', '/feedback')

    const btnRanking = screen.getByRole('button', { name: /ranking/i });
  
    userEvent.click(btnRanking)

    const { pathname } = history.location

    expect(pathname).toBe('/ranking')
  });
});
