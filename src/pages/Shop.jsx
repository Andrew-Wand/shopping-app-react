import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  setDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase.config";
import ShopNav from "../components/ShopNav";
import ShopItem from "../components/ShopItem";
import Loading from "../components/Loading";
import { IoShirtSharp } from "react-icons/io5";

function Shop({ handleAddToCart, category, setCategory, gender, setGender }) {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsRef = collection(db, "listings");

        const q = query(listingsRef);

        const querySnap = await getDocs(q);

        let listings = [];

        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setListings(listings);
        setLoading(false);
      } catch (error) {
        console.log("cannot fetch listings");
      }
    };

    fetchListings();
  }, [loading]);

  return (
    <div>
      {/* <header className="hidden lg:block">
        <ShopNav
          category={category}
          setCategory={setCategory}
          gender={gender}
          setGender={setGender}
        />
      </header> */}

      {loading ? (
        <Loading />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <h1 className="text-center underline text-4xl m-5 lg:text-5xl lg:m-10 lg:mt-36">
              {category === "tshirt"
                ? "T-Shirts"
                : category === "shirt" && gender === "men"
                ? "Dress Shirts"
                : category === "shirt" && gender === "women"
                ? "Dresses"
                : category === "sweater"
                ? "Sweaters"
                : category === "jacket"
                ? "Jackets"
                : ""}
            </h1>
            <div className="divider lg:w-6/12 lg:ml-[25%]">
              <IoShirtSharp className="text-4xl" />
            </div>
            <ul className="lg:grid lg:grid-cols-3 lg:mx-48">
              {listings?.map((e, listing) => {
                if (e.data.gender !== gender) {
                  return;
                } else if (e.data.category === category) {
                  // Adding items to cart
                  const handleAddToCart = async () => {
                    try {
                      const cartClick = e;

                      await setDoc(
                        doc(db, "cartItems", cartClick.id),
                        cartClick.data
                      );
                    } catch (error) {
                      console.log(error);
                    }
                  };

                  return (
                    <ShopItem
                      listing={listing.data}
                      id={e.id}
                      key={e.id}
                      category={category}
                      setCategory={setCategory}
                      gender={gender}
                      e={e.data}
                      targetId={e.id}
                      handleAddToCart={handleAddToCart}
                    />
                  );
                }
              })}
            </ul>
          </main>
        </>
      ) : (
        <p>Nothing here</p>
      )}
    </div>
  );
}

export default Shop;
