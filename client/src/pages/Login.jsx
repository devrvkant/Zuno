import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import LoginForm from "../components/login/LoginForm";
import { useLogInMutation } from "../features/auth/authApi";

const Login = () => {
  const navigate = useNavigate();
  const [logIn, { isLoading }] = useLogInMutation();

  const handleLogin = async (email, password) => {
    try {
      // first signUp the user
      await logIn({
        email,
        password,
      }).unwrap();
      // then navigate the user to dashboard
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Error in logIn : ", err);
      toast.error(err);
    }
  };

  return <LoginForm handleLogin={handleLogin} isLoading={isLoading} />;
};

export default Login;
