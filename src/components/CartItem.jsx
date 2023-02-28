import { useState, useEffect } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
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

  const addQuantity = async () => {
    setQuantity((previousQuantity) => previousQuantity + 1);
    await updateDoc(doc(db, "cartItems", id), {
      quantity: quantity + 1,
    });
  };

  const minusQuantity = async () => {
    setQuantity((previousQuantity) => previousQuantity - 1);
    await updateDoc(doc(db, "cartItems", id), {
      quantity: quantity - 1,
    });
  };
  return (
    <li className="grid grid-cols-[104px_0.66fr_0.33fr;] my-10 border-b-slate-300 border-b-[1px] p-5 ">
      <div>
        <figure>
          <Link to={`/shop/${item.category}/${id}`}>
            <img src={item.image} alt={`${item.name}`} className="w-full" />
          </Link>
          {/* <img src={item.image} alt="Clothing" /> */}
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
            {/* <div
              className="border-r border-primary text-sm px-1 pr-3 w-6 flex justify-center items-center cursor-pointer"
              onClick={minusQuantity}
            >
              <AiOutlineMinus />
            </div> */}
            <p>Qty: {quantity}</p>
            {/* <div
              className="border-l border-primary text-sm px-1 pl-2 w-6 flex justify-center items-center cursor-pointer"
              onClick={addQuantity}
            >
              <AiOutlinePlus />
            </div> */}
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
