import { useUserContext } from "../../contexts/UserContext";
import './Profile.css';
import React, { useState } from "react";

function Profile() {
  const { user } = useUserContext();

  const [file, setFile] = useState();
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    const [form, setForm] =useState({});

    const handleSubmit = async (e) => {

    };
    function setValue(e){
      const target=e.target
      const name=target.name
      const value=target.value

      setForm({...form, [name] : value})
    }
  return (
    <>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      
      <div className="profile">
      <div className="profile__container">
        <div className="profile__left">
        <h2>Add Image:</h2>
            <input type="file" onChange={handleChange} />
            <img src={file} />
           
        </div>
        <div className="profile__right">
          <form >
          <h2><center>Profil {user.name}</center></h2>
            <div className="profile__formInput">
              <label>Nama Lengkap</label>
              <input type="text" placeholder="name" name="name" value={user.name} onChange={setValue} />  
            </div>
            <div className="profile__formInput">
              <label>Username</label>
              <input type="text" placeholder="username" name="username" value={user.username} onChange={setValue}/>
            </div>
            <div className="profile__formInput">
              <label>Email</label>
              <input type="text" placeholder="email" name="email" value={user.email} onChange={setValue}/>
            </div>
            <div className="profile__formInput">
              <label>Password</label>
              <input
                type="password" value={user.password} onChange={setValue}/>
            </div>
            <button type="submit" className="btn-filled">
              Simpan
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
    
  );
}

export default Profile;
