import { Link } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";

import { getDoc, doc } from "firebase/firestore";
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
  handleAddToWishlist,
}) {
  const [inWishlist, setInWishlist] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const itemIsInWishlist = async () => {
      const docRef = doc(db, "wishlist", targetId);
      const docSnap = await getDoc(docRef);
      const userRef = docSnap.data()?.userRef;
      if (auth.currentUser.uid === userRef) {
        setInWishlist(true);
      } else {
        setInWishlist(false);
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

      <button
        onClick={handleAddToWishlist}
        className="absolute text-4xl right-10 top-5"
      >
        {!inWishlist ? <FaRegHeart /> : <FaHeart />}
      </button>
    </li>
  );
}

export default ShopItem;
