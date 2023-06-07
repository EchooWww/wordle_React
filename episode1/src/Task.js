export const Task = (props) => {
  return (
    <div
      className="items"
      style={{ backgroundColor: props.completed ? "green" : "white" }}
    >
      <label>
        <input type="checkbox" />
        {props.taskName}
      </label>
      <button onClick={() => props.updateTask(props.id)}>✅</button>
      <button onClick={() => props.handleDelete(props.id)}>❌</button>
    </div>
  );
};
