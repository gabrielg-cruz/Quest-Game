import React from 'react';
import GenericForm from '../components//Form/index';
import './LoginPage.scss';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const fields = [
    { name: 'username', type: 'text', placeholder: 'Email', required: true },
    { name: 'password', type: 'password', placeholder: 'Senha', required: true },
  ];

  const handleLogin = (values: Record<string, string>) => {
    
    // Adicione aqui a chamada de autenticação ao backend, por exemplo:
    // authService.login({ username, password })
    navigate('/admin/themes');
  };

  return (
    <div className="login-page-container">
      <img src="/login-logo.png" alt="Logo" className="login-logo" />
      <GenericForm
        fields={fields}
        method="POST"
        variant="login"
        className="login-form"
        onSubmit={handleLogin}
      />
      <div className="first-access-container">
        <div
          className="first-access-content"
          onClick={() => navigate('/register')}
        >
          Primeiro acesso? Clique aqui e cadastre-se
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
