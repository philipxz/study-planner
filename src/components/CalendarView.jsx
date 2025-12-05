import { useState } from 'react';
import { useTasks } from '../context/TaskContext';

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export default function CalendarView({ onAddTaskForDate }) {
  const { tasks } = useTasks();
  const today = new Date();

  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = getDaysInMonth(year, month);

  function formatDate(y, m, d) {
    const mm = String(m + 1).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    return `${y}-${mm}-${dd}`;
  }

  const todayDateOnly = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  function formatDate(y, m, d) {
    const mm = String(m + 1).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    return `${y}-${mm}-${dd}`;
  }

  const tasksByDate = tasks.reduce((map, task) => {
    if (!task.dueDate) return map;
    if (!map[task.dueDate]) map[task.dueDate] = [];
    map[task.dueDate].push(task);
    return map;
  }, {});

  function prevMonth() {
    setMonth(prevMonth => (prevMonth === 0 ? 11 : prevMonth - 1));
    setYear(prevYear => (month === 0 ? prevYear - 1 : prevYear));
  }

  function nextMonth() {
    setMonth(prevMonth => (prevMonth === 11 ? 0 : prevMonth + 1));
    setYear(prevYear => (month === 11 ? prevYear + 1 : prevYear));
  }

  const cells = [];

  for (let i = 0; i < firstDay; i++) {
    cells.push(<div key={`x-${i}`} className="calendar-cell empty" />);
  }

  for (let d = 1; d <= totalDays; d++) {
    const dateStr = formatDate(year, month, d);
    const dayTasks = tasksByDate[dateStr] || [];

    const cellDate = new Date(year, month, d);
    cellDate.setHours(0, 0, 0, 0);

    const isToday =
    cellDate.getTime() === todayDateOnly.getTime();

    const isPast = cellDate < todayDateOnly;

    const classNames = ['calendar-cell'];
    if (isToday) classNames.push('today');
    if (isPast) classNames.push('past');

    cells.push(
      <button
        key={dateStr}
        className={classNames.join(' ')}
        onClick={() => {
          if (!isPast) {
            onAddTaskForDate(dateStr);
          }
        }}
        disabled={isPast}
      >
        <div className="calendar-day-number">{d}</div>

        {dayTasks.length > 0 && (
          <div className="calendar-task-dots">
            {dayTasks.slice(0, 3).map(t => (
              <span className="calendar-dot" key={t.id}></span>
            ))}
            {dayTasks.length > 3 && (
              <span className="calendar-more">+{dayTasks.length - 3}</span>
            )}
          </div>
        )}
      </button>
    );
  }

  const monthName = new Date(year, month).toLocaleString('default', {
    month: 'long'
  });

  return (
    <div className="calendar-view">
      <div className="calendar-header">
        <button onClick={prevMonth}>&lt;</button>
        <h2>
          {monthName} {year}
        </h2>
        <button onClick={nextMonth}>&gt;</button>
      </div>

      <div className="calendar-weekdays">
        <span>Sun</span>
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
      </div>

      <div className="calendar-grid">{cells}</div>
    </div>
  );
}
