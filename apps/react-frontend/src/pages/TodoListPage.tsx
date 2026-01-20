import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import type {AppDispatch} from '../store';
import {fetchTodos} from '../store/todoSlice';
import {TodoListApp} from '../components/TodoListApp.tsx';
import {TodoAddApp} from "../components/TodoAddApp.tsx";

export const TodoListPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchTodos()); // 页面加载时只调用一次
    }, [dispatch]);

    return (
        <div className="container mt-3">
            <h3>Todo List</h3>
            <TodoAddApp/> {/* useRef */}
            <TodoListApp/> {/* TodoListApp 内部直接读取 store */}
        </div>
    );
};
