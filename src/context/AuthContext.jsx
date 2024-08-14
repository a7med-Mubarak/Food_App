import { jwtDecode } from 'jwt-decode';
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [loginData, setLoginData] = useState(null);

    const saveLoginData = (data) => {
      let encodedToken = localStorage.getItem("token");
      let decodedToken = jwtDecode(encodedToken);
      setLoginData(decodedToken)        
    };

    return (
        <AuthContext.Provider value={{ loginData, saveLoginData }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
