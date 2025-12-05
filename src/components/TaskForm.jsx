import { useEffect, useState } from 'react';

const emptyTask = {
  id: null,
  title: '',
  subject: '',
  dueDate: '',
  priority: 'medium',
  completed: false
};

export default function TaskForm({ initialTask, onSave, onCancel }) {
  const [task, setTask] = useState(initialTask || emptyTask);

  useEffect(() => {
    setTask(initialTask || emptyTask);
  }, [initialTask]);

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const todayStr = `${yyyy}-${mm}-${dd}`;

  function handleChange(e) {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!task.title.trim() || !task.dueDate) return;
    onSave(task);
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{task.id ? 'Edit Task' : 'Add Task'}</h2>

        <form onSubmit={handleSubmit} className="task-form">
          <label>
            Title
            <input
              name="title"
              value={task.title}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Subject
            <input
              name="subject"
              value={task.subject}
              onChange={handleChange}
            />
          </label>

          <label>
            Due Date
            <input
              type="date"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
              min={todayStr} 
              required
            />
          </label>

          <label>
            Priority
            <select
              name="priority"
              value={task.priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>

          <div className="modal-actions">
            <button type="submit">{task.id ? 'Save Changes' : 'Add Task'}</button>
            <button type="button" className="secondary" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
