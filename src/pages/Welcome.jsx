import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, getDocs, query, limit, where } from "firebase/firestore";
import WelcomePicture from "../assets/other/welcome-pic.jpg";
import { db } from "../firebase.config";
import FeaturedCard from "../components/FeaturedCard";
import ModelMen from "../assets/other/model-men-1.jpg";
import ModelWomen from "../assets/other/model-women-1.jpg";
import InfoPic1 from "../assets/other/info-pic-1.jpg";
import InfoPic2 from "../assets/other/info-pic-2.jpg";
import InfoPic3 from "../assets/other/info-pic-3.jpg";
import { IoShirtSharp } from "react-icons/io5";

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
            className="h-[30rem] brightness-[64.5%] welcome-img lg:w-full lg:h-[48rem]"
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

      {/* FEATURED SECTION */}
      <section>
        <div className="mt-10">
          <h1 className="text-center text-3xl">Featured Items</h1>
          <div className="divider">
            <IoShirtSharp className="text-5xl text-gray-500" />
          </div>
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

      {/* PICTURE SECTION */}
      <section className="mt-32 bg-base-300 w-full h-full">
        <div className="top flex items-center justify-between w-full">
          <div className="left flex flex-col max-w-[50%] justify-center p-5 items-start text-lg">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut sequi,
              voluptate veniam, ratione voluptatum.
            </p>
          </div>
          <div className="right h-full w-6/12">
            <figure>
              <img
                src={ModelMen}
                alt="Men's Model"
                className="overflow-hidden object-cover w-[15rem] h-full object-center"
              />
            </figure>
          </div>
        </div>
        <div className="divider my-16">
          <IoShirtSharp className="text-5xl text-gray-500" />
        </div>
        <div className="bottom flex items-center justify-between w-full">
          <div className="left h-full w-6/12">
            <figure>
              <img
                src={ModelWomen}
                alt="Women's Model"
                className="overflow-hidden object-cover w-[15rem] h-full object-center"
              />
            </figure>
          </div>
          <div className="right flex flex-col max-w-[50%] justify-center p-5 items-start text-lg">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Excepturi voluptatibus tempora.
            </p>
          </div>
        </div>
      </section>

      {/* INFO SECTION */}
      <section className="text-center">
        <h1 className="text-3xl m-12 uppercase font-bold">Who we are</h1>
        <div>
          <div>
            <div className="avatar">
              <div className="rounded-full h-[15rem] w-[15rem]">
                <img src={InfoPic1} alt="Pic of clothes" />
              </div>
            </div>

            <h2 className="text-2xl font-bold my-5 uppercase">Used Clothing</h2>
            <p className="p-5">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde eos
              tempore sapiente quo, nemo, dolore quisquam ab possimus enim
              aperiam eligendi sequi tenetur. Architecto, quae sunt repellendus
              itaque voluptas veniam.
            </p>
          </div>
        </div>
        <div className="mt-16 bg-base-300">
          <div>
            <div className="avatar mt-10">
              <div className="rounded-full h-[15rem] w-[15rem]">
                <img src={InfoPic2} alt="Pic of clothes" />
              </div>
            </div>

            <h2 className="text-2xl font-bold my-5 uppercase">Made to last</h2>
            <p className="p-5">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde eos
              tempore sapiente quo, nemo, dolore quisquam ab possimus enim
              aperiam eligendi sequi tenetur. Architecto, quae sunt repellendus
              itaque voluptas veniam.
            </p>
          </div>
        </div>
        <div className="mt-16">
          <div>
            <div className="avatar mt-10">
              <div className="rounded-full h-[15rem] w-[15rem]">
                <img src={InfoPic3} alt="Pic of clothes" />
              </div>
            </div>

            <h2 className="text-2xl font-bold my-5 uppercase">Modern styles</h2>
            <p className="p-5">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde eos
              tempore sapiente quo, nemo, dolore quisquam ab possimus enim
              aperiam eligendi sequi tenetur. Architecto, quae sunt repellendus
              itaque voluptas veniam.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Welcome;
