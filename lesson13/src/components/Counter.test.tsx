import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Counter } from './Counter';

describe('Counter', () => {
  it('shows 0 as the initial count', () => {
    render(<Counter />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('increments the count when Hækka is clicked', async () => {
    render(<Counter />);
    await userEvent.click(screen.getByText('Hækka'));
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('decrements the count when Minnka is clicked', async () => {
    render(<Counter />);
    await userEvent.click(screen.getByText('Minnka'));
    expect(screen.getByText('-1')).toBeInTheDocument();
  });

  it('resets the count when Endurstilla is clicked', async () => {
    render(<Counter />);
    await userEvent.click(screen.getByText('Hækka'));
    await userEvent.click(screen.getByText('Endurstilla'));
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});