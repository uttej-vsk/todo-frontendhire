type TaskListHeaderProps = {
  count: number;
};

export default function TaskListHeader({ count }: TaskListHeaderProps) {
  return (
    <>
      <h2 className="task-list-header">
        {count === 1 ? `You have ${count} task` : `You have ${count} tasks`}
      </h2>
    </>
  );
}
