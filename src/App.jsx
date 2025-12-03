import { ThemeProvider } from './context/ThemeContext';
import { TaskProvider, useTasks } from './context/TaskContext';
import Header from './components/Header';
import TaskList from './components/TaskList';
import CalendarView from './components/CalendarView';
import ProgressSummary from './components/ProgressSummary';
import TaskForm from './components/TaskForm';
import { useState } from 'react';

import './App.css'

function AppContent() {
  const { addTask, updateTask } = useTasks();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  function handleAddNew() {
    setEditingTask(null);
    setIsFormOpen(true);
  }

  function handleAddForDate(dateString) {
    setEditingTask({
      id: null,
      title: '',
      subject: '',
      dueDate: dateString,
      priority: 'medium',
      completed: false
    });
    setIsFormOpen(true);
  }

  function handleEditTask(task) {
    setEditingTask(task);
    setIsFormOpen(true);
  }

  function handleCloseForm() {
    setIsFormOpen(false);
    setEditingTask(null);
  }

  function handleSaveTask(taskData) {
    if (taskData.id) {
      updateTask(taskData.id, taskData);
    } else {
      addTask(taskData);
    }
    handleCloseForm();
  }

  return (
    <div className="app-container">
      <Header onAddTask={handleAddNew} />
      <main className="main-layout">
        <section className="panel left-panel">
          <TaskList onEditTask={handleEditTask} />
        </section>
        <section className="panel right-panel">
          <CalendarView onAddTaskForDate={handleAddForDate} />
          <ProgressSummary />
        </section>
      </main>

      {isFormOpen && (
        <TaskForm
          initialTask={editingTask}
          onSave={handleSaveTask}
          onCancel={handleCloseForm}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <AppContent />
      </TaskProvider>
    </ThemeProvider>
  );
}