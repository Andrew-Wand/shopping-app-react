import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase.config";
import Loading from "../components/Loading";

function SingleItem() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState("");

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

  // Adding items to cart
  const handleAddToCart = async () => {
    try {
      const itemId = params.listingId;
      const cartClick = listing;

      const docRef = doc(db, "cartItems", itemId);
      const docSnap = await getDoc(docRef);

      const dataCopy = {
        ...cartClick,
        quantity: 1,
        size: size,
      };

      await setDoc(doc(db, "cartItems", itemId), dataCopy);
    } catch (error) {
      console.log(error);
    }
  };

  const onSizeChange = (e) => {
    setSize(e.target.value);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <header>
        <h1>{listing.name}</h1>
      </header>

      <main>
        <div>
          <figure>
            <img src={listing.image} alt="Clothing" />
          </figure>

          <button onClick={handleAddToCart}>Add To Cart</button>
        </div>
        <select name="size" id="size" onChange={onSizeChange}>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
          <option value="X-Large">X-Large</option>
        </select>
      </main>
    </div>
  );
}

export default SingleItem;
