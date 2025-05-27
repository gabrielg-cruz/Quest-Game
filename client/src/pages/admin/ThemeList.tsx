import React, { useEffect, useState } from 'react';
import { getThemes, deleteTheme } from '../../api/themeService';
import { ThemeResponseDTO } from '../../models/dto-models';
import { useNavigate } from 'react-router-dom';
import GenericButton from '../../components/Button';
import '../../styles/admin.scss';

const ThemeList: React.FC = () => {
  const [themes, setThemes] = useState<ThemeResponseDTO[]>([]);
  const navigate = useNavigate();

  const loadThemes = async () => {
    try {
      const data = await getThemes();
      setThemes(data);
    } catch (err) {
      console.error('Erro ao carregar temas', err);
    }
  };

  useEffect(() => {
    loadThemes();
  }, []);

  const handleDelete = async (id: number) => {
    if (
      window.confirm(
        'Excluir este tema e TODAS as questões vinculadas?'
      )
    ) {
      await deleteTheme(id);
      loadThemes();
    }
  };

  return (
    <div className='admin-page'>
      <div className="admin-container">
        <h2>Temas</h2>
        <GenericButton
          variant="secondary"
          onClick={() => navigate('/admin/themes/new')}
        >
          Novo Tema
        </GenericButton>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Código</th>
              <th>Grátis</th>
              <th>Custo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {themes.map(t => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.name}</td>
                <td>{t.code}</td>
                <td>{t.free ? 'Sim' : 'Não'}</td>
                <td>{t.cost}</td>
                <td>
                  <GenericButton
                    variant="secondary"
                    onClick={() => navigate(`/admin/themes/${t.id}/edit`)}
                  >
                    Editar
                  </GenericButton>
                  <GenericButton
                    variant="danger"
                    onClick={() => handleDelete(t.id)}
                  >
                    Excluir
                  </GenericButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ThemeList;