import { createContext, useState, useEffect } from "react";

export const MyContext = createContext({
  currentUser: null,
  userRole: "",
  setUserFunction: (data) => {},
  setRoleFunction: (role) => {},
  clearUserFunction: () => {},
});

export const MyContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      console.log("User loaded from localStorage:", parsedUser);
      setCurrentUser(parsedUser);
      setUserRole(parsedUser.role);
    }
  }, []);

  const setUserFunction = (userData) => {
    if (userData) {
      setCurrentUser(userData);
      setRoleFunction(userData.role || ""); // Ako role ne postoji, postavi prazan string
    } else {
      setCurrentUser(null);
      setRoleFunction(""); // Resetuj ulogu na prazan string
    }
  };

  const setRoleFunction = (role) => {
    setUserRole(role);
  };

  const clearUserFunction = () => {
    setCurrentUser(null);
    setUserRole("");
  };

  return (
    <MyContext.Provider
      value={{
        currentUser,
        userRole,
        setUserFunction,
        setRoleFunction,
        clearUserFunction,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};
