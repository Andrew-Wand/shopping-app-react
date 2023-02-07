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
import ShopItem from "../components/ShopItem";
import Loading from "../components/Loading";

function Shop() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

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
  }, []);
  return (
    <div>
      <header>
        <ShopNav />
      </header>

      {loading ? (
        <Loading />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul>
              {listings.map((listing) => (
                <ShopItem
                  listing={listing.data}
                  id={listing.id}
                  key={listing.id}
                />
              ))}
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
