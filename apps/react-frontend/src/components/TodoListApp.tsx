import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { removeTodoLocal, toggleTodoLocal } from '../store/todoSlice';
import axios from '../utils/api';
import { useNavigate } from 'react-router-dom';


export const TodoListApp: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const todos = useSelector((state: RootState) => state.todo.todos || []); // 直接从 store 拿

    const navigate = useNavigate(); // React Router hook

    return (
        <div>
            {todos.length === 0 ? (
                <div className="alert alert-info">还没有添加Todo,请在上面添加！</div>
            ) : (
                <ul className="list-group">
                    {(todos).map(todo => (
                        <li
                            key={todo.id}
                            className={`list-group-item d-flex justify-content-between align-items-center ${todo.completed ? 'list-group-item-success' : ''}`}
                        >
                            <span onClick={() => navigate(`/todos/${todo.id}`)}>{todo.title} - {todo.description}</span>
                            <div>
                                <button className="btn btn-sm btn-outline-success me-2" onClick={() => dispatch(toggleTodoLocal(todo.id))}>Toggle</button>
                                <button className="btn btn-sm btn-outline-danger" onClick={async () => {
                                    await axios.delete(`/todos/${todo.id}`);
                                    dispatch(removeTodoLocal(todo.id));
                                }}>Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
