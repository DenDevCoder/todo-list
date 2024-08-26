import { useState, useEffect } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchData, addData, removeData, toggleData } from "./Redux/todoSlice";

function App() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const [value, setValue] = useState("");

  const handleAddTask = async (text) => {
    await dispatch(addData(text));
    setValue("");
  };

  const handleToggleTask = (id) => {
    dispatch(toggleData(id));
  };

  const handleDeleteTask = (id) => {
    dispatch(removeData(id));
  };

  return (
    <>
      <h2>Todo List</h2>
      <ul>
        {todos.task.map((todo) => (
          <li
            key={todo._id}
            style={{
              fontSize: 24,
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.task}
            <button
              style={{ fontSize: 16, marginLeft: 10 }}
              onClick={() => handleToggleTask(todo._id)}
            >
              complete
            </button>
            <button
              style={{ fontSize: 16, marginLeft: 10 }}
              onClick={() => handleDeleteTask(todo._id)}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        onKeyDown={(e) => (e.key == "Enter" ? handleAddTask(value) : null)}
      />
    </>
  );
}

export default App;
