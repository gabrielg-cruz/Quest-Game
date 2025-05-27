import GenericForm from '../components/Form';
import { useNavigate } from 'react-router-dom';


const RegisterPage = () => {
  const navigate = useNavigate();
  const fields = [
    {
      name: "email",
      type: "email",
      placeholder: "Digite o seu email",
      required: true,
    },
    {
      name: "username",
      type: "text",
      placeholder: "Digite o nome do seu usuário",
      required: true,
    },
    {
      name: "password",
      type: "password",
      placeholder: "Digite a sua senha",
      required: true,
    }
  ];
  return (
     <div className="login-page-container">
          <div className="login-page-content">
            <h1>Quest</h1>
            <GenericForm
              method="POST"
              fields={fields}
              submitLabel="Login"
              variant="login"
              className=""
            />
            <div className="first-access-container">
              <div className="first-access-content" onClick={() => navigate("/register")}>
                Já possuí cadastro? Clique aqui para fazer login
              </div>
            </div>
          </div>
        </div>
  )
}

export default RegisterPage