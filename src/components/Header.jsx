import { useTheme } from '../context/ThemeContext';

export default function Header({ onAddTask }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header-spacer"></div>

      <div className="header-title">
        <h1>Study Planner</h1>
        <p>Organize your study schedule, assignments, and deadlines.</p>
      </div>

      <div className="header-actions">
        <button onClick={onAddTask}>+ Add Task</button>
        <button onClick={toggleTheme}>
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </div>
    </header>
  );
}

