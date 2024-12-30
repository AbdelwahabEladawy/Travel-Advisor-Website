import { createContext, useContext, useReducer } from "react";

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case "logOut":
      return { ...state, isAuthenticated: false, user: null };

    default:
      throw new Error("unKnown action");
  }
}

const AuthContaxt = createContext();
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
      reducer,
      initialState,
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }
  function logOut() {
    dispatch({ type: "logOut" });
  }

  return (
    <AuthContaxt.Provider value={{ user, login, logOut, isAuthenticated }}>
      {children}
    </AuthContaxt.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContaxt);
  if (context === undefined) {
    throw new Error("you can not use the context out of AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
