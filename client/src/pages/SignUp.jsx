import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import SignUpForm from "../components/signUp/SignUpForm";
import { useSignUpMutation } from "../features/auth/authApi";

const SignUp = () => {
  const navigate = useNavigate();
  const [signUp, { isLoading }] = useSignUpMutation();

  const handleSignUp = async (name, email, password) => {
    try {
      // first signUp the user
      await signUp({
        name,
        email,
        password,
      }).unwrap();
      // then navigate to verify-email page
      navigate("/verify-email", { replace: true });
      // also send the success message to the user
      toast.success(
        "Account created successfully, verification code sent to your provided email to verify your account(Check spam also!)."
      );
    } catch (err) {
      console.error("Error in SignUp : ", err);
      toast.error(err);
    }
  };

  return <SignUpForm handleSignUp={handleSignUp} isLoading={isLoading} />;
};

export default SignUp;
