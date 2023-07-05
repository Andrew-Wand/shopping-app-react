import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import OAuth from "../components/OAuth";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;

      await setDoc(doc(db, "users", user.uid), formDataCopy);

      navigate("/");
    } catch (error) {}
  };

  return (
    <>
      <div>
        <header>
          <p className="text-center text-4xl m-5 lg:text-5xl lg:m-10">
            Sign Up
          </p>
        </header>

        <form
          onSubmit={onSubmit}
          className="flex flex-col items-left p-5 lg:items-center"
        >
          <div className="form-control ml-5">
            <label className="input-group">
              <span>Name</span>
              <input
                className="input input-bordered w-[15.5rem]"
                type="text"
                id="name"
                value={name}
                onChange={onChange}
                required
              />
            </label>
          </div>

          <div className="form-control my-5 ml-5">
            <label className="input-group">
              <span>Email</span>
              <input
                className="input input-bordered w-[15.9rem]"
                type="email"
                id="email"
                value={email}
                onChange={onChange}
                required
              />
            </label>
          </div>

          <div className="form-control ml-5">
            <label className="input-group">
              <span>Password</span>
              <input
                className="input input-bordered"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={onChange}
                required
              />
            </label>
          </div>
          <p
            className="cursor-pointer text-center mt-5"
            onClick={() => setShowPassword((prevState) => !prevState)}
          >
            Show Password
          </p>

          <div className="flex flex-col my-10">
            <button className="btn">Sign Up</button>
          </div>
          <OAuth />
          <Link to="/sign-in" className="btn btn-outline btn-info  my-10 ">
            Sign In Instead
          </Link>
        </form>
      </div>
    </>
  );
}

export default SignUp;
