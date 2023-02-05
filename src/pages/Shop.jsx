import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase.config";
import ShopNav from "../components/ShopNav";

function Shop() {
  const [listings, setListings] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsRef = collection(db, "listings");

        const q = query(
          listingsRef,
          where("category", "==", "tshirt"),
          limit(10)
        );

        const querySnap = await getDocs(q);

        let listings = [];

        querySnap.forEach((doc) => {
          console.log(doc.data());
        });
      } catch (error) {
        console.log("cannot fetch listings");
      }
    };

    fetchListings();
  }, []);
  return (
    <div>
      <div>
        <ShopNav />
      </div>

      <main>
        <div>Shop</div>
      </main>
    </div>
  );
}

export default Shop;
