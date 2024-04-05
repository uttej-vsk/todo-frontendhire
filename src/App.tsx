import { useState } from 'react';

type Priority = 'p1' | 'p2' | 'p3';

type Task = {
  id: number;
  title: string;
  isCompleted: boolean;
  priority?: Priority;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [taskName, setTaskName] = useState('');

  const onAddTask = () => {
    const trimmedTaskName = taskName.trim();

    if (!trimmedTaskName) return;
    setTasks([
      ...tasks,
      { id: Date.now(), title: trimmedTaskName, isCompleted: false },
    ]);
    setTaskName('');
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onAddTask();
    }
  };

  return (
    <div>
      <h1>Tasks</h1>
      <label className="sr-only" htmlFor="task-input">
        Add Task:{' '}
      </label>
      <input
        id="task-input"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        onKeyDown={onInputKeyDown}
      />
      <button onClick={onAddTask}>Add</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
