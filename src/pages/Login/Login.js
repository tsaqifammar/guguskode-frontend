import { useState } from 'react';
import './Login.css';

function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
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
              <input type="text" value={identifier} onChange={(e) => setIdentifier(e.value)} />
            </div>
            <div className="login__formInput">
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.value)} />
            </div>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <button type="submit" className="btn-filled">Masuk</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
