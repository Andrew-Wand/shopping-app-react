import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { useState } from "react";
import { IoTrashOutline } from "react-icons/io5";

function WishlistItem({ wishItem, wishlist, setWishlist }) {
  const onDeleteFromWishlist = async (wishlistId) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await deleteDoc(doc(db, "wishlist", wishlistId));

      const updatedCart = wishlist.filter((item) => item.id !== wishlistId);
      setWishlist(updatedCart);
      console.log("Success delete!");
    }
  };

  return (
    <li className="grid grid-cols-[104px_0.66fr_0.33fr;] my-10 border-b-slate-300 border-b-[1px] p-5 ">
      <div>
        <figure>
          <img src={wishItem.data.image} alt="Clothing" />
        </figure>
      </div>

      <div className="ml-10 mt-12">
        <h1 className="text-lg font-bold">{wishItem.data.name}</h1>
      </div>

      <div className="ml-10 mt-[4rem]">
        <button
          type="button"
          onClick={() => onDeleteFromWishlist(wishItem.id)}
          className="text-2xl"
        >
          <IoTrashOutline />
        </button>
      </div>
    </li>
  );
}

export default WishlistItem;
