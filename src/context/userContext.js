import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext({
  user: {},
  isLoggedIn: false,
  changeLoginStatus: status => {},
});

const UserContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const changeLoginStatus = status => {
    if (typeof status === 'boolean') setIsLoggedIn(status);
  };

  return (
    <UserContext.Provider value={{ user: {}, isLoggedIn, changeLoginStatus }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

export const useUser = () => {
  const { user, isLoggedIn, changeLoginStatus } = useContext(UserContext);

  return { user, isLoggedIn, changeLoginStatus };
};
