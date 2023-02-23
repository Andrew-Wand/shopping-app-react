import { getAuth, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";

function Profile() {
  const navigate = useNavigate();
  const auth = getAuth();

  const [changeDetails, setChangeDetails] = useState(false);

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;

  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // Update display name in fb
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        // update in firestore
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          name,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className="h-screen">
      <header className="flex justify-between p-10">
        <p className="text-4xl underline font-bold">My Profile</p>
        <button className="btn" onClick={onLogout}>
          Logout
        </button>
      </header>

      <main className="bg-base-200 p-10 m-5 shadow-xl rounded-lg lg:w-6/12 ">
        <div>
          <p className="text-xl font-bold">Personal Details</p>
          <p
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails((prevState) => !prevState);
            }}
            className="btn my-5"
          >
            {changeDetails ? "done" : "change"}
          </p>
        </div>

        <div>
          <form>
            <label className="input-group">
              <span className="bg-base-200 text-xl">Name:</span>
              <input
                type="text"
                id="name"
                disabled={!changeDetails}
                value={name}
                onChange={onChange}
                className="input input-bordered w-full max-w-xs text-xl"
              />
            </label>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Profile;
