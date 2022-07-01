import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getProfile, login } from '../../api/users';
import { useUserContext } from '../../contexts/UserContext';
import './Register.css';

function Register() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="register">
      <div className="register__container">
        <div className="register__right">
          <form onSubmit={onSubmit}>
            <h1 style={{alignSelf: 'center'}}>Register</h1>
            <div className="register__formInput">
              <label>Nama Lengkap</label>
              <input 
                type="text" 
                value={name}
                className="form-control"
                placeholder="Nama Lengkap"
              />
            </div>
            <div className="register__formInput">
              <label>Username</label>
              <input 
                type="text" 
                placeholder="Username" 
              />
            </div>
            <div className="register__formInput">
              <label>Email</label>
              <input 
                type="email" 
                className="form-control"
                placeholder="Email"

              />
            </div>
            <div className="register__formInput">
              <label>Password</label>
              <input 
                type="password" 
                value={password} 
                className="form-control"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.tager.value)}
              />
            </div>
            <div className="register__formInput">
              <label>Confirm Password</label>
              <input 
                type="password" 
                value={password}
                className="form-control" 
                placeholder="Confirm Password"
                onChange={(e) => setPassword(e.tager.value)}
              />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit" className="btn-filled"  onClick={onSubmit}>
              Register
            </button>
            <div className="register__goRegister">
              <p> Memiliki Akun?</p>
              <Link to="/login">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
