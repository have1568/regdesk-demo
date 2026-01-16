import { Routes, Route, Navigate } from 'react-router-dom';
import { TodoListPage } from './pages/TodoListPage';
import { TodoDetailPage } from './pages/TodoDetailPage';
import { Navbar } from "./components/Navbar.tsx";


export default function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Navigate to="/todos" />} />
                <Route path="/todos" element={<TodoListPage />} />
                <Route path="/todos/:id" element={<TodoDetailPage />} />
            </Routes>
        </>
    );
}