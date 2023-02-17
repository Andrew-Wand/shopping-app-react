import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, getDocs, query, limit, where } from "firebase/firestore";
import WelcomePicture from "../assets/other/welcome-pic.jpg";
import { db } from "../firebase.config";
import FeaturedCard from "../components/FeaturedCard";

function Welcome() {
  const [featured, setFeatured] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const listingsRef = collection(db, "listings");

        const q = query(listingsRef, limit(6));

        const querySnap = await getDocs(q);

        let featured = [];

        querySnap.forEach((doc) => {
          return featured.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setFeatured(featured);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <div className="background relative">
      <header>
        <figure>
          <img
            src={WelcomePicture}
            alt="Store Picture"
            className="h-[30rem] brightness-[60%] welcome-img"
          />
        </figure>
        <div className="absolute top-48 left-10 ">
          <p className="text-[30px] text-base-100 text-center uppercase font-extrabold welcome-text whitespace-nowrap">
            All styles, all tops
          </p>
          <Link
            to="/shop"
            className="btn btn-lg bg-base-100 text-[#000] rounded-lg ml-28 mt-10"
          >
            Shop
          </Link>
        </div>
      </header>

      <section>
        <div className="mt-10">
          <h1 className="text-center text-3xl">Featured Items</h1>
          <div className="divider"></div>
          <div className="featured-cards grid grid-cols-2 gap-10 p-5">
            {featured?.map((feature) => (
              <FeaturedCard
                featuredItems={feature.data}
                id={feature.id}
                key={feature.id}
              />
            ))}
          </div>
        </div>
      </section>

      <section>
        <div></div>
      </section>
    </div>
  );
}

export default Welcome;
