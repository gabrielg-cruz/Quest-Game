import React, { useEffect, useState } from 'react';
import { getQuestions, deleteQuestion } from '../../api/questionService';
import { QuestionResponseDTO } from '../../models/dto-models';
import { useNavigate } from 'react-router-dom';
import GenericButton from '../../components/Button';
import '../../styles/admin.scss';

const QuestionList: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionResponseDTO[]>([]);
  const navigate = useNavigate();

  const loadQuestions = async () => {
    try {
      const data = await getQuestions();
      setQuestions(data);
    } catch (err) {
      console.error('Erro ao carregar questões', err);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  const handleDelete = async (id: number) => {
    if (
      window.confirm(
        'Você tem certeza que deseja excluir esta questão? Esta ação não pode ser desfeita.'
      )
    ) {
      await deleteQuestion(id);
      loadQuestions();
    }
  };

  return (
    <div className='admin-page'>
      <div className="admin-container">
        <h2>Questões</h2>
        <GenericButton
          variant="secondary"
          onClick={() => navigate('/admin/questions/new')}
        >
          Nova Questão
        </GenericButton>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Pergunta</th>
              <th>Dificuldade</th>
              <th>Tema</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {questions.map(q => (
              <tr key={q.id}>
                <td>{q.id}</td>
                <td>{q.text}</td>
                <td>{q.difficulty}</td>
                <td>{q.themeId}</td>
                <td>
                  <GenericButton
                    variant="secondary"
                    onClick={() => navigate(`/admin/questions/${q.id}/edit`)}
                  >
                    Editar
                  </GenericButton>
                  <GenericButton
                    variant="danger"
                    onClick={() => handleDelete(q.id)}
                  >
                    Excluir
                  </GenericButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
      <button
        type="button"
        onClick={() => navigate('/')}
        className="bg-black text-white font-semibold py-2 px-6 rounded-xl hover:opacity-90 transition"
      >VOLTAR</button>
    </div>
  );
};

export default QuestionList;