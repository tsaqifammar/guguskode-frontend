import { useState } from 'react';
import { login } from '../../api/users';
import { useUserContext } from '../../contexts/UserContext';
import './Login.css';

function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { setUser } = useUserContext();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(identifier, password);
      setUser(user);
    } catch (error) {
      setError('Login gagal');
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__left">
          <h1 className="logo">GugusKode</h1>
          <p>Tersedia untuk membantu Anda belajar bahasa pemrograman.</p>
        </div>
        <div className="login__right">
          <form onSubmit={onSubmit}>
            <h1>Login</h1>
            <div className="login__formInput">
              <label>Username atau Email</label>
              <input
                type="text"
                name="identifier"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </div>
            <div className="login__formInput">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit" className="btn-filled">
              Masuk
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
