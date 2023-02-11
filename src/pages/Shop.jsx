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
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase.config";
import ShopNav from "../components/ShopNav";
import ShopItem from "../components/ShopItem";
import Loading from "../components/Loading";

function Shop({ handleAddToCart }) {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState("tshirt");
  const [gender, setGender] = useState("men");

  const auth = getAuth();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsRef = collection(db, "listings");

        const q = query(listingsRef, limit(20));

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
  }, [listings]);

  return (
    <div>
      <header>
        <ShopNav
          category={category}
          setCategory={setCategory}
          gender={gender}
          setGender={setGender}
        />
      </header>

      {loading ? (
        <Loading />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul>
              {listings.map((e, listing) => {
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
                      id={listing.id}
                      key={listing.id}
                      category={category}
                      setCategory={setCategory}
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
