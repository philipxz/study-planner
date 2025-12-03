import { useTasks } from '../context/TaskContext';

export default function TaskItem({ task, onEditTask }) {
  const { updateTask, deleteTask } = useTasks();

  function toggleCompleted() {
    updateTask(task.id, { completed: !task.completed });
  }

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-main">
        <input type="checkbox" checked={task.completed} onChange={toggleCompleted} />

        <div className="task-text">
          <div className="task-title-line">
            <span className="task-title">{task.title}</span>
            <span className={`badge priority-${task.priority}`}>{task.priority}</span>
          </div>

          <div className="task-meta">
            {task.subject && <span>{task.subject}</span>}
            <span>Due: {task.dueDate}</span>
          </div>
        </div>
      </div>

      <div className="task-actions">
        <button onClick={() => onEditTask(task)}>Edit</button>
        <button className="secondary" onClick={() => deleteTask(task.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}
