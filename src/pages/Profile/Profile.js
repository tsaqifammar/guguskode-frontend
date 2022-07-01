import { useUserContext } from '../../contexts/UserContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import './Profile.css';
import { getProfile, updateProfile } from '../../api/users';

function Profile() {
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  });
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      username: user.username,
      email: user.email,
      name: user.name,
    }));
  }, [user]);

  function setValue(e) {
    setError('');
    setSuccessMsg('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {};

    const fieldsToBeChecked = ['name', 'username', 'email'];
    for (let i = 0; i < fieldsToBeChecked.length; i++) {
      if (formData[fieldsToBeChecked[i]].trim().length === 0) {
        setError(`${fieldsToBeChecked[i]} tidak boleh kosong`);
        return;
      } else {
        updatedData[fieldsToBeChecked[i]] = formData[fieldsToBeChecked[i]];
      }
    }

    if (formData.password) {
      if (formData.password !== formData.confirmPassword) {
        setError('Confirm password tidak sesuai dengan password');
        return;
      }
      if (formData.password.trim().length === 0) {
        setError('Password tidak boleh kosong');
        return;
      }
      updatedData['password'] = formData.password;
    }
    // console.log({ updatedData });

    try {
      await updateProfile(user.token, user.id, updatedData, profilePic);
      const profile = await getProfile(user.id, user.token);
      setUser({ ...profile, token: user.token });
      localStorage.setItem(
        'user',
        JSON.stringify({ ...profile, token: user.token })
      );
    } catch (error) {
      setError('Simpan profil gagal');
    }

    setSuccessMsg('Profil berhasil disimpan');
  };

  function logout() {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  }

  return (
    <>
      <div className="container-80">
        <Navbar />
      </div>
      <div className="profile">
        <div className="profile__container">
          <div className="profile__left">
            <h2>Profile Picture</h2>
            <input
              type="file"
              onChange={(e) => setProfilePic(e.target.files[0])}
            />
          </div>
          <div className="profile__right">
            <form onSubmit={handleSubmit}>
              <h2>Profil</h2>
              <div className="profile__formInput">
                <label>Nama Lengkap</label>
                <input
                  type="text"
                  placeholder="name"
                  name="name"
                  value={formData.name}
                  onChange={setValue}
                />
              </div>
              <div className="profile__formInput">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  value={formData.username}
                  onChange={setValue}
                />
              </div>
              <div className="profile__formInput">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={formData.email}
                  onChange={setValue}
                />
              </div>
              <div className="profile__formInput">
                <label>Password</label>
                <input
                  name="password"
                  type="password"
                  placeholder="password"
                  value={formData.password}
                  onChange={setValue}
                />
              </div>
              <div className="profile__formInput">
                <label>Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="confirm password"
                  value={formData.confirmPassword}
                  onChange={setValue}
                />
              </div>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              {successMsg && (
                <p style={{ color: 'green' }}>Success: {successMsg}</p>
              )}
              <button type="submit" className="btn-filled">
                Simpan
              </button>
            </form>
            <button
              type="button"
              className="btn-filled-danger"
              style={{ marginTop: '1rem' }}
              onClick={logout}
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
