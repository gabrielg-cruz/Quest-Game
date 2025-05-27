import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/admin.scss';

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-yellow-400 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col space-y-6">
                {/* Botões ADMIN */}
                <div className="flex space-x-4 justify-center">
                    <h1>ADMIN</h1>
                </div>

                {/* Botões de redirecionamento */}
                <div className="flex space-x-4 justify-center">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/themes')}
                        className="bg-black text-white font-semibold py-2 px-6 rounded-xl hover:opacity-90 transition"
                    >
                        TEMAS
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/admin/questions')}
                        className="bg-black text-white font-semibold py-2 px-6 rounded-xl hover:opacity-90 transition"
                    >
                        PERGUNTAS
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
