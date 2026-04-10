import { useTheme } from '../context/ThemeContext';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button onClick={toggle}>
      {theme === 'light' ? 'Dark mode' : 'Light mode'}
    </button>
  );
}