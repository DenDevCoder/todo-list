import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  task: [],
  status: "idle",
  error: null,
};

//Generate pending, fulfilled and rejected action types
export const fetchData = createAsyncThunk("/todos/task", () => {
  return axios
    .get("http://localhost:3000/api/task")
    .then((response) => response.data);
});

//add new task to list
export const addData = createAsyncThunk(
  "/todos/add",
  async (text, { dispatch }) => {
    await axios.post("http://localhost:3000/api/task", {
      task: text,
    });
    dispatch(fetchData());
  }
);

// remove task from list
export const removeData = createAsyncThunk(
  "/todos/remove",
  async (id, { dispatch }) => {
    await axios
      .delete(`http://localhost:3000/api/task/${id}`)
      .then(() => "task was deleted")
      .catch((error) => console.log(error));
    dispatch(fetchData());
  }
);

export const toggleData = createAsyncThunk(
  "todos/update",
  async (id, { dispatch }) => {
    await axios
      .patch(`http://localhost:3000/api/task/${id}`)
      .then(() => "task was completed")
      .catch((error) => console.log(error));
    dispatch(fetchData());
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    toggleToDo: (state, action) => {
      const todo = state.task.find((task) => task.id == action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
  extraReducers: (builder) => {
    //fetchData function()
    builder.addCase(fetchData.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.task = action.payload;
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      (state.status = "failed"), (state.error = action.error.message);
    });
  },
});

export default todoSlice.reducer;
