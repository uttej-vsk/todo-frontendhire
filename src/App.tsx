import { useEffect, useState } from 'react';
import { Task } from './types';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import TaskListItem from './components/TaskListItem';
import TaskListHeader from './components/TaskListCount';
import './index.css';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const onAddTask = (taskName: string) => {
    setTasks([
      ...tasks,
      { id: Date.now(), title: taskName, isCompleted: false },
    ]);
  };

  const handleUpdate = (taskId: number, newTitle: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, title: newTitle } : task,
    );
    setTasks(updatedTasks);
  };

  const handleDelete = (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <h1>Todo List</h1>

      <AddTask onAddTask={onAddTask} />

      <TaskList header={<TaskListHeader count={tasks.length} />}>
        {tasks.map((task) => (
          <TaskListItem
            key={task.id}
            task={task}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          >
            {task.title}
          </TaskListItem>
        ))}
      </TaskList>
    </div>
  );
}
