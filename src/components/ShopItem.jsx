import { Link } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { getDoc, doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { getAuth } from "firebase/auth";

function ShopItem({
  listing,
  id,
  category,
  setCategory,
  gender,
  e,
  targetId,
  handleAddToCart,
}) {
  const auth = getAuth();

  const [inWishlist, setInWishlist] = useState(false);

  // Add items to wishlist
  const handleAddToWishlist = async () => {
    if (inWishlist === true) {
      setInWishlist(!inWishlist);
      onDeleteFromWishlist(targetId);
    } else {
      setInWishlist(!inWishlist);

      const dataCopy = {
        ...e,
        userRef: auth.currentUser.uid,
      };

      await setDoc(doc(db, "wishlist", targetId), dataCopy);
    }
  };

  // Delete from wishlist after click
  const onDeleteFromWishlist = async (wishlistId) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await deleteDoc(doc(db, "wishlist", wishlistId));
    } else {
      setInWishlist(true);
    }
  };

  useEffect(() => {
    const itemIsInWishlist = async () => {
      const docRef = doc(db, "wishlist", targetId);
      const docSnap = await getDoc(docRef);
      const userRef = docSnap.data()?.userRef;
      if (docSnap.exists()) {
        if (auth.currentUser.uid === userRef) {
          setInWishlist(true);
        } else {
          setInWishlist(false);
        }
      }
    };

    itemIsInWishlist();
  }, []);

  return (
    <li className="m-10 card my-28">
      <Link to={`/shop/${e.category}/${targetId}`}>
        <img src={e.image} alt={`${e.name}`} className="w-full" />
      </Link>

      <div className="flex justify-between">
        <p className="text-xl py-2">{e.name}</p>
        <p className="text-xl py-2">${e.price}</p>
      </div>

      <div>
        <button
          onClick={handleAddToWishlist}
          className="absolute text-4xl right-10 top-5"
        >
          {!inWishlist ? <FaRegHeart /> : <FaHeart />}
        </button>
      </div>
    </li>
  );
}

export default ShopItem;
