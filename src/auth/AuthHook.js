import axios from "axios";
import { useContext } from "react";
import UserContext from "./UserContext";

function useAuth() {
  const { user, setUser } = useContext(UserContext);

  async function login(email, password) {
    const response = await axios.post("/auth/login", { email, password });
    const userData = { ...response.data.user, ...response.data.token.original };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  return {
    login,
    logout,
    user,
  };
}

export default useAuth;
