import { useState } from 'react';

type AddTaskProps = {
  onAddTask: (taskName: string) => void;
};

export default function AddTask({ onAddTask }: AddTaskProps) {
  const [taskName, setTaskName] = useState('');

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedTaskName = taskName.trim();
    if (!trimmedTaskName) return;
    onAddTask(trimmedTaskName);
    setTaskName('');
  };

  return (
    <form onSubmit={handleAddTask} className="add-task-form">
      <label className="sr-only" htmlFor="task-input">
        Add Task:{' '}
      </label>
      <input
        required
        type="text"
        id="task-input"
        value={taskName}
        placeholder="Whats on your mind?"
        onChange={(e) => setTaskName(e.target.value)}
        className="task-input"
      />

      <button className="add-btn">Add</button>
    </form>
  );
}
