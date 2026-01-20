import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store';
import { addTodoLocal } from '../store/todoSlice';
import axios from '../utils/api';


export const TodoAddApp: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const title = useRef<HTMLInputElement>(null);
    const desc = useRef<HTMLInputElement>(null);

    const handleAdd = async () => {
        if (!title.current?.value?.trim()) return;
        try {
            const res = await axios.post('/todos', { title, description: desc });
            dispatch(addTodoLocal(res.data)); // 更新 store
            if (title.current) title.current.value = '';
            if (desc.current) desc.current.value = '';
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <div className="mb-3">
                <input
                    className="form-control mb-2"
                    placeholder="Title"
                    ref={title}
                />
                <input
                    className="form-control mb-2"
                    placeholder="Description"
                    ref={desc}
                />
                <button className="btn btn-primary" onClick={handleAdd}>Add Todo</button>
            </div>
        </div>
    );
};
