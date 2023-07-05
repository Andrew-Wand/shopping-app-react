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
    <div className="lg:flex lg:flex-col lg:items-center h-[500px] lg:h-[800px] lg:mt-20">
      <Link to="/sign-in" className="btn m-5">
        Back to Sign In
      </Link>
      <header>
        <p className="text-center text-3xl m-5 lg:text-5xl lg:m-10">
          Forgot Password
        </p>
      </header>

      <main>
        <form onSubmit={onSubmit}>
          <div className="form-control ml-5">
            <label className="input-group">
              <span>Email</span>
              <input
                type="email"
                className="input input-bordered w-[69.5%] lg:w-full lg:mr-7"
                id="email"
                value={email}
                onChange={onChange}
              />
            </label>
          </div>

          <button className="btn m-5">Send Reset Link</button>
        </form>
      </main>
    </div>
  );
}

export default ForgotPassword;
