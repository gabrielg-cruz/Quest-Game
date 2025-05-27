import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createTheme,
  getThemeById,
  updateTheme,
} from '../../api/themeService';
import {
  ThemeCreateDTO,
  ThemeUpdateDTO,
} from '../../models/dto-models';
import GenericButton from '../../components/Button';
import '../../styles/admin.scss';

const ThemeForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [free, setFree] = useState(false);
  const [cost, setCost] = useState(0);

  useEffect(() => {
    if (isEdit) {
      getThemeById(Number(id)).then(t => {
        setName(t.name);
        setCode(t.code);
        setFree(t.free);
        setCost(t.cost);
      });
    }
  }, [id, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit) {
        const payload: ThemeUpdateDTO = { id: Number(id), name, code, free, cost };
        await updateTheme(Number(id), payload);
      } else {
        const payload: ThemeCreateDTO = { name, code, free, cost };
        await createTheme(payload);
      }
      navigate('/admin/themes');
    } catch (err) {
      console.error('Erro ao salvar tema', err);
    }
  };

  return (
    <div className='admin-page'>
      <div className="admin-container">
        <h2>{isEdit ? 'Editar Tema' : 'Novo Tema'}</h2>
        <form onSubmit={handleSubmit} className="admin-form">
          <div>
            <label>Nome</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Código</label>
            <input
              value={code}
              onChange={e => setCode(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Grátis</label>
            <input
              type="checkbox"
              checked={free}
              onChange={e => setFree(e.target.checked)}
            />
          </div>
          {!free && (
            <div>
              <label>Custo</label>
              <input
                type="number"
                value={cost}
                onChange={e => setCost(Number(e.target.value))}
                required
              />
            </div>
          )}
          <GenericButton variant="secondary" type="submit">
            {isEdit ? 'Atualizar' : 'Criar'}
          </GenericButton>
          <GenericButton variant="login" onClick={() => navigate('/admin/themes')}>
            Cancelar
          </GenericButton>
        </form>
      </div>
    </div>
  );
};

export default ThemeForm;