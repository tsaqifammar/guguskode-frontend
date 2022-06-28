import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

const userInLocalStorage = localStorage.getItem('user');
let initialState = null;

if (userInLocalStorage) {
  initialState = JSON.parse(userInLocalStorage);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(initialState);

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
}
