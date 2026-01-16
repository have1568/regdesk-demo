import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../utils/api';
import type { Todo } from '../store/todoSlice';

export const TodoDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const [todo, setTodo] = useState<Todo | null>(null);

    useEffect(() => {
        if (id) axios.get(`/todos/${id}`).then(res => setTodo(res.data));
    }, [id]);

    if (!todo) return <p>Loading...</p>;

    return (
        <div className="container mt-3">
            <h3>Todo Detail</h3>
            <p><strong>Title:</strong> {todo.title}</p>
            <p><strong>Description:</strong> {todo.description}</p>
            <p><strong>Completed:</strong> {todo.completed ? 'Yes' : 'No'}</p>
            <p><strong>Created At:</strong> {todo.createdAt}</p>
            <p><strong>Updated At:</strong> {todo.updatedAt}</p>
        </div>
    );
};
