import React, { useState } from 'react';
import { Task } from '../types';

type TaskListItemProps = {
  children: string;
  task: Task;
  onUpdate: (taskId: number, newTitle: string) => void;
  onDelete: (taskId: number) => void;
};

const TaskListItem = ({
  children,
  task,
  onUpdate,
  onDelete,
}: TaskListItemProps) => {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(children);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleUpdate = () => {
    if (newTitle.trim() !== '') {
      onUpdate(task.id, newTitle);
    }

    setEditMode(false);
  };

  const handleCancel = () => {
    setNewTitle(children);
    setEditMode(false);
  };

  return (
    <li className="task-list-item">
      {editMode ? (
        <>
          <label htmlFor="updatedTask"></label>
          <input
            type="text"
            id="updatedTask"
            value={newTitle}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewTitle(e.target.value)
            }
            aria-label="Updated Task"
            className="updated-task"
          />

          <button
            onClick={handleUpdate}
            aria-label="Update"
            name="Update"
            className="update-btn"
          >
            Update
          </button>

          <button
            onClick={handleCancel}
            aria-label="Cancel"
            name="Cancel"
            className="cancel-btn"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <span className="task-list-item-children">{children}</span>

          <button
            onClick={handleEdit}
            aria-label="Edit"
            name="Edit"
            className="edit-btn"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(task.id)}
            aria-label="Delete"
            name="Delete"
            className="delete-btn"
          >
            Delete
          </button>
        </>
      )}
    </li>
  );
};

export default TaskListItem;
