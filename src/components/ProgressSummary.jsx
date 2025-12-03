import { useTasks } from '../context/TaskContext';

export default function ProgressSummary() {
  const { tasks } = useTasks();
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="progress-summary">
      <h3>Progress</h3>
      <p>
        {completed} / {total} tasks completed
      </p>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
      <p>{percent}% done</p>
    </div>
  );
}
