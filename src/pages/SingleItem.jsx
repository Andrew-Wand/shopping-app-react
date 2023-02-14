import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase.config";
import Loading from "../components/Loading";

function SingleItem() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();

  useEffect(() => {
    const fetchSingleItem = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    };

    fetchSingleItem();
  }, [navigate, params.listingId]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <header>
        <h1>{listing.name}</h1>
      </header>
    </div>
  );
}

export default SingleItem;
