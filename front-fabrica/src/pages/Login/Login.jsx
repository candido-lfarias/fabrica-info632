import './Login.css';
import cafeImage from '../../assets/cafe.png';

function Login() {
  return (
    <div className="container">
      <div className="login-section">
        <h1 className="title">CAFÉ</h1>
        <h2 className="subtitle">AU CARAMELO</h2>
        <p className="slogan">UM CAFÉ GOSTOSO PRA CACHORRO!</p>

        <hr className="divider" />

        <form className="login-form">
          <label htmlFor="email">Nome de usuário</label>
          <input type="email" id="email" placeholder="Seu email" />

          <label htmlFor="password">Senha</label>
          <input type="password" id="password" placeholder="Sua senha" />

          <a href="#" className="forgot">Esqueceu sua senha?</a>

          <button type="submit">LOGIN</button>
        </form>
      </div>

      <div className="image-section">
        <img src={cafeImage} alt="Café au Caramelo" />
      </div>
    </div>
  );
}

export default Login;
