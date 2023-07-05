import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, getDocs, query, limit, where } from "firebase/firestore";
import WelcomePicture from "../assets/other/welcome-pic.webp";
import { db } from "../firebase.config";
import FeaturedCard from "../components/FeaturedCard";
import ModelMen from "../assets/other/model-men-1.webp";
import ModelWomen from "../assets/other/model-women-1.webp";
import InfoPic1 from "../assets/other/info-pic-1.webp";
import InfoPic2 from "../assets/other/info-pic-2.webp";
import InfoPic3 from "../assets/other/info-pic-3.webp";
import { IoShirtSharp } from "react-icons/io5";
import "aos/dist/aos.css";
import AOS from "aos";

function Welcome({ gender, setGender, setCategory, category }) {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState(null);

  // Initialize animation on scroll

  useEffect(() => {
    AOS.init();
  }, []);

  const handleSelectGender = (selection) => {
    if (selection === "men") {
      setGender("men");
      navigate("/shop");
    }

    if (selection === "women") {
      setGender("women");
      navigate("/shop");
    }
  };

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
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(${WelcomePicture})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-3xl bg-zinc-500/[.6] rounded-md shadow-xl w-full h-[300px] lg:p-5">
            <h1 className="my-5 text-5xl font-bold whitespace-nowrap mb-10 welcome-text uppercase text-[30px] lg:text-5xl">
              All styles, all tops
            </h1>
            <div className="lg:flex">
              <button
                className="btn btn-lg btn-secondary lg:btn-primary mb-5 w-[20rem] lg:mr-20 rounded-md"
                onClick={() => handleSelectGender("men")}
              >
                Shop Men
              </button>
              <button
                className="btn btn-lg btn-secondary lg:btn-primary w-[20rem] rounded-md"
                onClick={() => handleSelectGender("women")}
              >
                Shop Women
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <header>
        <figure>
          <img
            src={WelcomePicture}
            alt="Store Picture"
            className="h-[35rem] w-full brightness-[64.5%] welcome-img lg:w-full lg:h-[80rem]"
          />
        </figure>

        <div className="absolute top-[3%] left-[2%] lg:top-[7%] lg:left-[30%] text-center bg-zinc-500/[.6] rounded-md shadow-xl lg:px-10 lg:py-5 py-5 mr-[2%] lg:mr-0">
          <p className="text-[30px] text-base-100 text-center uppercase font-extrabold welcome-text whitespace-nowrap lg:text-5xl mb-10">
            All styles, all tops
          </p>
          <button
            className="btn btn-lg btn-secondary lg:btn-primary mb-5 w-[20rem] lg:mr-20 rounded-md"
            onClick={() => handleSelectGender("men")}
          >
            Shop Men
          </button>
          <button
            className="btn btn-lg btn-secondary lg:btn-primary w-[20rem] rounded-md"
            onClick={() => handleSelectGender("women")}
          >
            Shop Women
          </button>
        </div>
      </header> */}

      {/* FEATURED SECTION */}
      <section>
        <div className="mt-10">
          <h1 className="text-center text-3xl lg:text-5xl lg:m-28">
            Featured Items
          </h1>

          <div className="divider">
            <IoShirtSharp className="text-5xl text-gray-500" />
          </div>

          <div className="featured-cards grid grid-cols-2 gap-10 p-5 lg:flex lg:m-10">
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

      <section>
        <div className="wrapper mt-32">
          {/* Top Section */}
          <div className="top flex flex-col-reverse lg:flex-row items-center lg:justify-between w-full  lg:p-20 bg-base-200">
            <div className="left lg:max-w-[50%] lg:justify-center lg:p-5 m-5 items-start text-md lg:text-3xl">
              <h1 className="text-center text-3xl font-bold lg:mb-10 my-8 lg:text-5xl">
                High Fashion
              </h1>
              <p className="lg:ml-20 m-5 ml-12">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                sequi, voluptate veniam, ratione voluptatum. Lorem ipsum dolor
                sit, amet consectetur adipisicing elit. Magni praesentium aut
                aspernatur adipisci!
              </p>
            </div>
            <div className="right p-5 lg:h-6/12 lg:w-[30%] lg:m-5 ">
              <figure>
                <img
                  src={ModelMen}
                  alt="Men's Model"
                  className="overflow-hidden object-cover w-full h-auto object-center lg:w-full lg:h-auto rounded-md drop-shadow-lg mt-2"
                />
              </figure>
            </div>
          </div>

          {/* Bottom section */}
          <div className="bottom flex flex-col lg:flex-row items-center lg:justify-between w-full lg:p-20 ">
            <div className="left lg:w-[28%] m-5 ">
              <figure>
                <img
                  src={ModelWomen}
                  alt="Women's Model"
                  className="overflow-hidden object-cover h-auto w-full object-center lg:w-full lg:h-auto rounded-md drop-shadow-lg"
                />
              </figure>
            </div>
            <div className="right flex flex-col lg:max-w-[50%] lg:justify-center lg:p-5 text-md lg:text-3xl m-5">
              <h1 className="text-center text-3xl font-bold lg:mb-10 mb-8 my-5 lg:text-5xl">
                Everyday Clothing
              </h1>
              <p className="lg:ml-20 m-3 ml-14">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Excepturi voluptatibus tempora. Lorem ipsum dolor sit amet
                consectetur adipisicing elit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INFO SECTION */}
      <section className="text-center lg:p-10 lg:bg-base-200 bg-base-200">
        <h1 className="text-3xl m-12 uppercase font-bold">Who we are</h1>
        <div className="lg:flex lg:justify-between lg:mt-32">
          <div
            data-aos="fade"
            data-aos-once="true"
            data-aos-anchor-placement="top-center"
            data-aos-delay="50"
            data-aos-duration="1500"
          >
            <div>
              <div className="avatar">
                <div className="rounded-full h-[15rem] w-[15rem]">
                  <img
                    className="w-full h-auto"
                    src={InfoPic1}
                    alt="Pic of clothes"
                  />
                </div>
              </div>

              <h2 className="text-2xl font-bold my-5 uppercase">
                Used Clothing
              </h2>
              <p className="p-5">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde
                eos tempore sapiente quo, nemo, dolore quisquam ab possimus enim
                aperiam eligendi sequi tenetur. Architecto, quae sunt
                repellendus itaque voluptas veniam.
              </p>
            </div>
          </div>
          <div
            className="mt-16   lg:mt-0"
            data-aos="fade"
            data-aos-once="true"
            data-aos-anchor-placement="top-center"
            data-aos-delay="100"
            data-aos-duration="1500"
          >
            <div className="h-[35rem]">
              <div className="avatar mt-10 lg:mt-0">
                <div className="rounded-full h-[15rem] w-[15rem]">
                  <img
                    className="h-auto w-full"
                    src={InfoPic2}
                    alt="Pic of clothes"
                  />
                </div>
              </div>

              <h2 className="text-2xl font-bold my-5 uppercase">
                Made to last
              </h2>
              <p className="p-5">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde
                eos tempore sapiente quo, nemo, dolore quisquam ab possimus enim
                aperiam eligendi sequi tenetur. Architecto, quae sunt
                repellendus itaque voluptas veniam.
              </p>
            </div>
          </div>
          <div
            className="mt-8 lg:mt-0"
            data-aos="fade"
            data-aos-once="true"
            data-aos-anchor-placement="top-center"
            data-aos-delay="150"
            data-aos-duration="1500"
          >
            <div className="h-[35rem]">
              <div className="avatar mt-10 lg:mt-0">
                <div className="rounded-full h-auto w-[15rem]">
                  <img
                    className="w-full h-auto"
                    src={InfoPic3}
                    alt="Pic of clothes"
                  />
                </div>
              </div>

              <h2 className="text-2xl font-bold my-5 uppercase">
                Modern styles
              </h2>
              <p className="p-5">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde
                eos tempore sapiente quo, nemo, dolore quisquam ab possimus enim
                aperiam eligendi sequi tenetur. Architecto, quae sunt
                repellendus itaque voluptas veniam.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Welcome;
