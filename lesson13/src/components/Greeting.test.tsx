import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Greeting } from './Greeting';

describe('Greeting', () => {
  it('shows no message initially', () => {
    render(<Greeting />);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('shows a greeting message after submitting a name', async () => {
    render(<Greeting />);
    await userEvent.type(screen.getByPlaceholderText('Skrifaðu nafn'), 'Oddný');
    await userEvent.click(screen.getByText('Senda'));
    expect(screen.getByRole('status')).toHaveTextContent('Halló, Oddný!');
  });

  it('shows no message when submitting an empty name', async () => {
    render(<Greeting />);
    await userEvent.click(screen.getByText('Senda'));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});
