import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDoc, doc, setDoc, updateDoc, increment } from "firebase/firestore";
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
        quantity: increment(1),
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
    <div className="mb-10">
      <main>
        <div className="flex flex-col lg:flex-row">
          <img
            src={listing.image}
            alt="Clothing"
            className="lg:w-4/12 lg:p-20 lg:ml-[25rem]"
          />

          <div className="lg:mt-10">
            <h1 className="text-3xl my-10 ml-10 font-extrabold lg:text-4xl">
              {listing.name}
            </h1>
            <select
              name="size"
              id="size"
              onChange={onSizeChange}
              className="select select-bordered w-full max-w-xs my-5 ml-10"
            >
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
              <option value="X-Large">X-Large</option>
            </select>
            <button onClick={handleAddToCart} className="btn mx-10">
              Add To Cart
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SingleItem;
