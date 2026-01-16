import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { addTodoLocal, removeTodoLocal, toggleTodoLocal } from '../store/todoSlice';
import axios from '../utils/api';
import { useNavigate } from 'react-router-dom';


export const TodoApp: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const todos = useSelector((state: RootState) => state.todo.todos || []); // 直接从 store 拿

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    const navigate = useNavigate(); // React Router hook

    const handleAdd = async () => {
        if (!title.trim()) return;
        try {
            const res = await axios.post('/todos', { title, description: desc });
            dispatch(addTodoLocal(res.data)); // 更新 store
            setTitle('');
            setDesc('');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            {/* 表单永远显示 */}
            <div className="mb-3">
                <input
                    className="form-control mb-2"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    className="form-control mb-2"
                    placeholder="Description"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleAdd}>Add Todo</button>
            </div>

            {/* 列表 */}
            {todos.length === 0 ? (
                <div className="alert alert-info">No todos yet. Add one above!</div>
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
