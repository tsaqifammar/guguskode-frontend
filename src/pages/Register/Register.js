import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../api/users';
import './Register.css';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const onFieldChange = (e) => {
    setError('');
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const fieldsToBeChecked = ['name', 'username', 'email', 'password'];
    for (let i = 0; i < fieldsToBeChecked.length; i++) {
      if (formData[fieldsToBeChecked[i]].trim().length === 0) {
        setError(`${fieldsToBeChecked[i]} tidak boleh kosong.`);
        return false;
      }
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Password dan confirm password tidak sesuai.');
      return false;
    }
    
    return true;
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        await register(formData);
        navigate('/login');
      } catch (error) {
        setError('Register gagal.');
      }
    }
  };

  return (
    <div className="register">
      <div className="register__container">
        <div className="register__left">
          <h1 className="logo">GugusKode</h1>
          <p>Tersedia untuk membantu Anda belajar bahasa pemrograman.</p>
        </div>
        <div className="register__right">
          <form onSubmit={onSubmit}>
            <h1 style={{ alignSelf: 'center' }}>Register</h1>
            <div className="register__formInput">
              <label>Nama Lengkap</label>
              <input
                type="text"
                name="name"
                placeholder="Nama Lengkap"
                value={formData.name}
                onChange={onFieldChange}
              />
            </div>
            <div className="register__formInput">
              <label>Username</label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={onFieldChange}
              />
            </div>
            <div className="register__formInput">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={onFieldChange}
              />
            </div>
            <div className="register__formInput">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={onFieldChange}
              />
            </div>
            <div className="register__formInput">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={onFieldChange}
              />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit" className="btn-filled" onClick={onSubmit}>
              Register
            </button>
            <div className="register__goRegister">
              <p>Memiliki Akun?</p>
              <Link to="/login">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
