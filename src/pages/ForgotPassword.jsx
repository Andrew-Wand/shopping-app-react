import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      console.log("email was sent");
    } catch (error) {
      console.log("could not send reset email");
    }
  };

  return (
    <div>
      <header>
        <p>Forgot Password</p>
      </header>

      <main>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            placeholder="Email"
            id="email"
            value={email}
            onChange={onChange}
          />
          <Link to="/sign-in">Sign In</Link>

          <div>
            <div>Send Reset Link</div>
          </div>
        </form>
      </main>
    </div>
  );
}

export default ForgotPassword;
