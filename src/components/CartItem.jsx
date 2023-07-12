import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { IoTrashOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function CartItem({ item, id, cartItems, setCartItems }) {
  const [quantity, setQuantity] = useState(
    item.quantity === 0 ? 1 : item.quantity
  );

  const onDeleteFromCart = async (cartItemId) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await deleteDoc(doc(db, "cartItems", cartItemId));

      const updatedCart = cartItems.filter((item) => item.id !== cartItemId);
      setCartItems(updatedCart);
      console.log("Success delete!");
    }
  };

  return (
    <li className="grid grid-cols-[104px_0.66fr_0.33fr;] my-10 border-b-slate-300 border-b-[1px] p-5 ">
      <div>
        <figure>
          <Link to={`/shop/${item.category}/${id}`}>
            <img src={item.image} alt={`${item.name}`} className="w-full" />
          </Link>
        </figure>
      </div>

      <div className="m-5 flex flex-col justify-between">
        <Link
          className="text-lg font-bold underline"
          to={`/shop/${item.category}/${id}`}
        >
          {item.name}
        </Link>

        <p className="py-2">{item.size}</p>
        <p className="py-2 text-[18px]">${item.price}</p>
        <div className=" mt-2 ml-1">
          {/* Adjust Quantity */}
          <div className="text-lg font-bold text-neutral w-24">
            <p>Qty: {quantity}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => onDeleteFromCart(id)}
          className="text-2xl"
        >
          <IoTrashOutline />
        </button>
      </div>
    </li>
  );
}

export default CartItem;
