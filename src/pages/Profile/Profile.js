import { useUserContext } from "../../contexts/UserContext";

function Profile() {
  const { user } = useUserContext();
  return (
    <>
      <h1>Profil {user.name}</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
}

export default Profile;
