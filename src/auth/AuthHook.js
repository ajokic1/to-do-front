import { useContext } from "react";
import UserContext from "./UserContext";
import AuthService from "../services/auth";

function useAuth() {
  const { user, setUser } = useContext(UserContext);

  async function login(email, password) {
    const status = await AuthService.login(email, password);
    setUser(status.user);
    return status;
  }

  function logout() {
    setUser(null);
    AuthService.logout();
  }

  return {
    login,
    logout,
    user,
  };
}

export default useAuth;
