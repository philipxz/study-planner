import { useTasks } from '../context/TaskContext';
import TaskItem from './TaskItem';

export default function TaskList({ onEditTask }) {
  const { tasks } = useTasks();

  return (
    <div>
      <h2>Task List</h2>

      {tasks.length === 0 && <p>No tasks yet. Click “Add Task” to begin!</p>}

      <ul className="task-list">
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} onEditTask={onEditTask} />
        ))}
      </ul>
    </div>
  );
}
