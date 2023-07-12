import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase.config";
import Loading from "../components/Loading";
import "animate.css";

function SingleItem() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState("Small");
  const [itemQuantity, setItemQuantity] = useState(1);
  const [addAnim, setAddAnim] = useState(false);

  let newId = listing?.name;

  const navigate = useNavigate();
  const params = useParams();

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
    // Add to cartitems collection
    const itemId = params.listingId;
    const cartClick = listing;

    const docRef = doc(db, "cartItems", itemId);
    const docSnap = await getDoc(docRef);

    const docRefDuplicate = doc(db, "cartItems", newId);
    const docSnapDuplicate = await getDoc(docRefDuplicate);

    if (!docSnap.exists()) {
      const dataCopy = {
        ...cartClick,
        quantity: itemQuantity,
        size: size,
      };

      setAddAnim(true);
      await setDoc(doc(db, "cartItems", itemId), dataCopy);

      // Same item different size
    } else if (docSnap.exists() && docSnap.data().size !== size) {
      const dataCopy = {
        ...cartClick,
        quantity: itemQuantity,
        size: size,
      };

      await setDoc(doc(db, "cartItems", newId), dataCopy);
      await updateDoc(doc(db, "cartItems", newId), {
        quantity: itemQuantity + docSnapDuplicate.data().quantity,
      });
      setAddAnim(true);

      // Same item same size
    } else {
      await updateDoc(doc(db, "cartItems", params.listingId), {
        quantity: itemQuantity + docSnap.data().quantity,
      });
      setAddAnim(true);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setAddAnim(false);
    }, 4000);
  }, [handleAddToCart]);

  // Sets the size for select
  const onSizeChange = (e) => {
    setSize(e.target.value);
  };

  // Sets the quantity for selection drop down
  const onQuantityChange = (e) => {
    setItemQuantity(e.target.value);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mb-10">
      {addAnim ? (
        <div className="toast lg:toast-start toast-end z-10">
          <div className="alert alert-info bg-black ">
            <div>
              <span>Added to cart.</span>
            </div>
          </div>
        </div>
      ) : (
        <>
          <p></p>
        </>
      )}
      <header>
        <div>
          <Link to="/shop" className="btn m-5">
            Back To Shop
          </Link>
        </div>
      </header>
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
            <span className="text-[20px]  ml-10">${listing.price}</span>
            <select
              name="quantity"
              id="quantity"
              className="select select-bordered ml-[14rem]"
              onChange={onQuantityChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
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
