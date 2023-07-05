import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import OAuth from "../components/OAuth";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <header>
          <p className="text-center text-4xl m-5 lg:text-5xl lg:m-10">
            Welcome Back!
          </p>
        </header>

        <form
          onSubmit={onSubmit}
          className="flex flex-col items-left lg:items-center p-5"
        >
          <div className="form-control ml-5">
            <label className="input-group">
              <span>Email</span>
              <input
                className="input input-bordered w-[69.5%] lg:w-full lg:mr-7"
                type="email"
                id="email"
                value={email}
                onChange={onChange}
              />
            </label>
          </div>

          <div className="form-control my-5 ml-5">
            <label className="input-group">
              <span>Password</span>
              <input
                type="password"
                className="input input-bordered lg:w-[60%]"
                id="password"
                value={password}
                onChange={onChange}
                required
              />
            </label>
          </div>

          <div className="flex flex-col max-w-[50%] ">
            <Link to="/forgot-password" className="btn my-5">
              Forgot Password
            </Link>
            <button className="btn">Sign In</button>
          </div>

          <div className="absolute top-[38%] right-[6%] lg:relative lg:top-0 lg:right-0 lg:my-5">
            <OAuth />
          </div>
          <Link to="/sign-up" className="btn btn-outline btn-info  my-10">
            Sign Up Instead
          </Link>
        </form>
      </div>
    </>
  );
}

export default SignIn;
