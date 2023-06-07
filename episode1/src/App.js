import "./App.css";
import { useState } from "react";
import { Task } from "./Task";
function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    const task = {
      id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
      taskName: newTask,
      completed: false,
    };
    setTodoList([...todoList, task]);
  };

  const handleDelete = (id) => {
    setTodoList(todoList.filter((item) => item.id !== id));
  };
  const updateTask = (id) => {
    setTodoList(
      todoList.map((task) => {
        if (task.id === id) return { ...task, completed: true };
        else {
          return task;
        }
      })
    );
  };

  return (
    <div className="App">
      <div className="addTask">
        <input
          onChange={(e) => {
            setNewTask(e.target.value);
          }}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="list">
        {todoList.map((task) => {
          return (
            <Task
              taskName={task.taskName}
              id={task.id}
              handleDelete={handleDelete}
              updateTask={updateTask}
              completed={task.completed}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
