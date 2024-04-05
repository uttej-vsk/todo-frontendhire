import { describe, test, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

import App from '../App';
import TaskListItem from '../components/TaskListItem';
import { Task } from '../types';

describe('App - Render & Add Tasks', () => {
  test('should render input field and add button', () => {
    render(<App />);
    const input = screen.getByRole('textbox', { name: 'Add Task:' });
    const button = screen.getByRole('button', { name: 'Add' });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('should add task to list when add button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByRole('textbox', { name: 'Add Task:' });
    const button = screen.getByRole('button', { name: 'Add' });

    await user.type(input, 'New Task');
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('New Task')).toBeInTheDocument();
    });
  });

  test('should clear the input field', async () => {
    const user = userEvent.setup();
    render(<App />);
    const input = screen.getByRole('textbox', { name: 'Add Task:' });
    const button = screen.getByRole('button', { name: 'Add' });

    await user.type(input, 'New Task');
    await user.click(button);

    await waitFor(() => {
      expect(input).toHaveValue('');
    });
  });
  test('should not add empty tasks', async () => {
    const user = userEvent.setup();
    render(<App />);
    const input = screen.getByRole('textbox', { name: 'Add Task:' });
    const button = screen.getByRole('button', { name: 'Add' });

    await user.type(input, ' ');
    await user.click(button);

    await waitFor(() => {
      expect(screen.queryAllByRole('listitem'));
    });
  });

  test('should add a task if we press the enter', async () => {
    const user = userEvent.setup();
    render(<App />);
    const input = screen.getByRole('textbox', { name: 'Add Task:' });

    await user.type(input, 'New Task{enter}');

    await waitFor(() => {
      expect(screen.queryAllByRole('listitem'));
    });
  });
});

describe('TaskListItem - Edit/Delete Tasks', () => {
  test('Should render edit and delete button', async () => {
    const mockOnUpdate = vi.fn();
    const mockOnDelete = vi.fn();
    const task = { id: 1, title: 'Task 1', isCompleted: false };
    render(
      <TaskListItem onUpdate={mockOnUpdate} onDelete={mockOnDelete} task={task}>
        {task.title}
      </TaskListItem>,
    );

    const editButton = screen.getByRole('button', { name: 'Edit' });
    const deleteButton = screen.getByRole('button', { name: 'Delete' });

    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });

  test('Should display input field to edit the task on click of Edit button', async () => {
    const mockOnUpdate = vi.fn();
    const mockOnDelete = vi.fn();
    const task = { id: 1, title: 'Task 1', isCompleted: false };
    render(
      <TaskListItem onUpdate={mockOnUpdate} onDelete={mockOnDelete} task={task}>
        {task.title}
      </TaskListItem>,
    );

    const editButton = screen.getByRole('button', { name: 'Edit' });
    await userEvent.click(editButton);

    const newInputForUpdatedTask = screen.getByRole('textbox', {
      name: 'Updated Task',
    });
    await userEvent.type(newInputForUpdatedTask, 'New Task');
  });

  test('Should update the task and display on screen after clicking update', async () => {
    const mockOnDelete = vi.fn();
    const mockOnUpdate = vi.fn();
    const task: Task = { id: 1, title: 'Task 1', isCompleted: false };

    render(
      <TaskListItem task={task} onDelete={mockOnDelete} onUpdate={mockOnUpdate}>
        {task.title}
      </TaskListItem>,
    );

    const editButton = screen.getByRole('button', { name: 'Edit' });
    await userEvent.click(editButton);

    const newInput = screen.getByLabelText('Updated Task');
    await userEvent.type(newInput, 'Content');

    const updateButton = screen.getByRole('button', { name: 'Update' });
    await userEvent.click(updateButton);

    await waitFor(() => {
      expect(screen.getByText(task.title)).toBeInTheDocument();
    });
  });

  test('Should cancel the update process if cancel button is clicked', async () => {
    const mockOnDelete = vi.fn();
    const mockOnUpdate = vi.fn();
    const task: Task = { id: 1, title: 'Task 1', isCompleted: false };

    render(
      <TaskListItem task={task} onDelete={mockOnDelete} onUpdate={mockOnUpdate}>
        {task.title}
      </TaskListItem>,
    );

    const editButton = screen.getByRole('button', { name: 'Edit' });
    await userEvent.click(editButton);

    const newInput = screen.getByLabelText('Updated Task');
    await userEvent.type(newInput, 'Content');

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    await userEvent.click(cancelButton);

    await waitFor(() => {
      expect(screen.getByText(task.title)).toBeInTheDocument();
    });
  });

  test('Should delete the task if delete button is clicked', async () => {
    const mockOnDelete = vi.fn();
    const mockOnUpdate = vi.fn();
    const task: Task = { id: 1, title: 'Task 1', isCompleted: false };

    render(
      <TaskListItem task={task} onDelete={mockOnDelete} onUpdate={mockOnUpdate}>
        {task.title}
      </TaskListItem>,
    );

    const editButton = screen.getByRole('button', { name: 'Edit' });
    await userEvent.click(editButton);

    const newInput = screen.getByLabelText('Updated Task');
    await userEvent.type(newInput, 'Content');

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    await userEvent.click(cancelButton);

    await waitFor(() => {
      expect(screen.queryByRole(task.title)).not.toBeInTheDocument();
    });
  });
});
