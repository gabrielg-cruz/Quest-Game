import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createQuestion,
  getQuestionById,
  updateQuestion,
} from '../../api/questionService';
import {
  QuestionCreateDTO,
  QuestionUpdateDTO,
  QuestionOptionCreateDTO,
} from '../../models/dto-models';
import GenericButton from '../../components/Button';
import '../../styles/admin.scss';

const QuestionForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [questionText, setQuestionText] = useState('');
  const [themeId, setThemeId] = useState<number>(0);
  const [difficulty, setDifficulty] = useState('EASY');
  const [options, setOptions] = useState<QuestionOptionCreateDTO[]>([
    { optionText: '', correct: false, questionId: id ? Number(id) : 0 },
    { optionText: '', correct: false, questionId: id ? Number(id) : 0 },
    { optionText: '', correct: false, questionId: id ? Number(id) : 0 },
    { optionText: '', correct: false, questionId: id ? Number(id) : 0 },
  ]);

  useEffect(() => {
    if (isEdit) {
      getQuestionById(Number(id)).then(q => {
        setQuestionText(q.text);
        setThemeId(q.themeId);
        setDifficulty(q.difficulty);
        const rawOptions = q.options as any[];

        const filledOptions: QuestionOptionCreateDTO[] = rawOptions.slice(0, 4).map(o => ({
          optionText: o.text,
          correct: o.correct,
          questionId: q.id,
        }));

        while (filledOptions.length < 4) {
          filledOptions.push({
            optionText: '',
            correct: false,
            questionId: q.id,
          });
        }

        setOptions(filledOptions);
      });
    }
  }, [id, isEdit]);

  const handleOptionChange = (
    index: number,
    field: keyof QuestionOptionCreateDTO,
    value: string | boolean
  ) => {
    const newOptions = [...options];

    if (field === 'correct') {
      newOptions[index].correct = value === true || value === 'true';
    } else if (field === 'optionText') {
      newOptions[index].optionText = value as string;
    } else if (field === 'questionId') {
      newOptions[index].questionId = Number(value); // apenas se realmente for editável
    }

    setOptions(newOptions);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: QuestionCreateDTO | QuestionUpdateDTO = isEdit
        ? { id: Number(id), questionText, difficulty, themeId, options }
        : { questionText, difficulty, themeId, options };
      if (isEdit) {
        await updateQuestion(Number(id), payload as QuestionUpdateDTO);

      } else {
        await createQuestion(payload as QuestionCreateDTO);
      }
      navigate('/admin/questions');
    } catch (err) {
      console.error('Erro ao salvar questão', err);

    }
  };

  return (
    <div className='admin-page'>
      <div className="admin-container">
        <h2>{isEdit ? 'Editar Questão' : 'Nova Questão'}</h2>
        <form onSubmit={handleSubmit} className="admin-form">
          <div className='form-group'>
            <label><strong>Pergunta</strong></label>
            <input value={questionText} onChange={e => setQuestionText(e.target.value)} required />
          </div>
          <div className='form-group'>
            <label><strong>Tema ID</strong></label>
            <input type="number" value={themeId} onChange={e => setThemeId(Number(e.target.value))} required />
          </div>
          <div className='form-group'>
            <label><strong>Dificuldade</strong></label>
            <select value={difficulty} onChange={e => setDifficulty(e.target.value)} className='form-select' required>
              <option value="EASY">Fácil</option>
              <option value="MEDIUM">Média</option>
              <option value="HARD">Difícil</option>
            </select>
          </div>
          <div className='options-container'>
            <label><strong>Alternativas</strong></label>
            {options.map((opt, idx) => (
              <div key={idx} className="option-group">
                <input
                  value={opt.optionText}
                  onChange={e => handleOptionChange(idx, 'optionText', e.target.value)}
                  required
                />
                <label>
                  Correta?
                  <input
                    type="radio"
                    name="correctOption" // mesmo nome para todas as opções
                    checked={opt.correct}
                    onChange={() => {
                      const newOptions = options.map((o, i) => ({
                        ...o,
                        correct: i === idx,
                      }));
                      setOptions(newOptions);
                    }}
                  />
                </label>

              </div>
            ))}
          </div>
          <GenericButton variant="secondary" type="submit">
            {isEdit ? 'Atualizar' : 'Criar'}
          </GenericButton>
          <GenericButton variant="login" onClick={() => navigate('/admin/questions')}>
            Cancelar
          </GenericButton>
        </form>
      </div>
    </div>
  );
};

export default QuestionForm;
