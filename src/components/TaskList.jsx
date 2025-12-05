import { useTasks } from '../context/TaskContext';
import TaskItem from './TaskItem';

function parseLocalDate(ymd) {
  const [y, m, d] = ymd.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export default function TaskList({ onEditTask }) {
  const { tasks } = useTasks();

  const priorityRank = {
    high: 1,
    medium: 2,
    low: 3
  };

  const sortedTasks = [...tasks].sort((taskA, taskB) => {
    const aCompleted = taskA.completed;
    const bCompleted = taskB.completed;

    if (aCompleted !== bCompleted) {
      return aCompleted ? 1 : -1;
    }

    if (!taskA.dueDate && !taskB.dueDate) return 0;
    if (!taskA.dueDate) return 1;
    if (!taskB.dueDate) return -1;

    const dateA = parseLocalDate(taskA.dueDate);
    const dateB = parseLocalDate(taskB.dueDate);

    if (dateA < dateB) return -1;
    if (dateA > dateB) return 1;

    const rankA = priorityRank[taskA.priority] ?? 99;
    const rankB = priorityRank[taskB.priority] ?? 99;

    return rankA - rankB;
  });

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const pastDueTasks = [];
  const todayTasks = [];
  const upcomingTasks = [];
  const noDateTasks = [];

  sortedTasks.forEach(task => {
    if (!task.dueDate) {
      noDateTasks.push(task);
      return;
    }

    const due = parseLocalDate(task.dueDate);

    if (due < today) {
      pastDueTasks.push(task);
    } else if (due.getTime() === today.getTime()) {
      todayTasks.push(task);
    } else {
      upcomingTasks.push(task);
    }
  });

  const hasNoTasks =
    pastDueTasks.length === 0 &&
    todayTasks.length === 0 &&
    upcomingTasks.length === 0 &&
    noDateTasks.length === 0;

  return (
    <div>
      <h2>Task List</h2>

      {hasNoTasks && <p>No tasks yet. Click “Add Task” to begin!</p>}

      <div className="task-list-scroll">
        <ul className="task-list">
          {pastDueTasks.length > 0 && (
            <>
              <li>
                <strong>Past Due</strong>
              </li>
              {pastDueTasks.map(task => (
                <TaskItem key={task.id} task={task} onEditTask={onEditTask} />
              ))}
            </>
          )}

          {todayTasks.length > 0 && (
            <>
              <li>
                <strong>Today</strong>
              </li>
              {todayTasks.map(task => (
                <TaskItem key={task.id} task={task} onEditTask={onEditTask} />
              ))}
            </>
          )}

          {upcomingTasks.length > 0 && (
            <>
              <li>
                <strong>Upcoming</strong>
              </li>
              {upcomingTasks.map(task => (
                <TaskItem key={task.id} task={task} onEditTask={onEditTask} />
              ))}
            </>
          )}

          {noDateTasks.length > 0 && (
            <>
              <li>
                <strong>No Due Date</strong>
              </li>
              {noDateTasks.map(task => (
                <TaskItem key={task.id} task={task} onEditTask={onEditTask} />
              ))}
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
