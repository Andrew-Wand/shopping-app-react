import { useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import googleIcon from "../assets/svg/googleIcon.svg";

function OAuth() {
  const navigate = useNavigate();

  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
        });
      }

      navigate("/");
    } catch (error) {
      console.log("could not authorize with google");
    }
  };

  return (
    <>
      <div className=" text-center ">
        <p className="">
          Sign {location.pathname === "/sign-up" ? "up" : "in"} with
        </p>
      </div>
      <div className="text-center">
        <button onClick={onGoogleClick}>
          <img src={googleIcon} alt="google" className="w-4/12 ml-16" />
        </button>
      </div>
    </>
  );
}

export default OAuth;
