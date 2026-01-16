import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from '../utils/api';

export interface Todo {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
}

interface TodoState {
    todos: Todo[];
    loading: boolean;
}

const initialState: TodoState = {
    todos: [],
    loading: false,
};

export const fetchTodos = createAsyncThunk('todo/fetchTodos', async () => {
    const res = await axios.get('/todos');
    return res.data.items;
});

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodoLocal(state, action: PayloadAction<Todo>) {
            state.todos.push(action.payload);
        },
        removeTodoLocal(state, action: PayloadAction<string>) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        },
        toggleTodoLocal(state, action: PayloadAction<string>) {
            const todo = state.todos.find(t => t.id === action.payload);
            if (todo) todo.completed = !todo.completed;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
            state.todos = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchTodos.rejected, (state) => {
            state.loading = false;
        });
    }
});

export const { addTodoLocal, removeTodoLocal, toggleTodoLocal } = todoSlice.actions;
export default todoSlice.reducer;
