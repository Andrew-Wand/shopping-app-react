import { Link, useNavigate } from "react-router-dom";
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
      <header>
        <figure>
          <img
            src={WelcomePicture}
            alt="Store Picture"
            className="h-[30rem] brightness-[64.5%] welcome-img lg:w-full lg:h-[48rem]"
          />
        </figure>

        <div className="absolute top-[3%] left-[2%] lg:top-[8%] lg:left-[30%] text-center">
          <p className="text-[30px] text-base-100 text-center uppercase font-extrabold welcome-text whitespace-nowrap lg:text-5xl mb-10">
            All styles, all tops
          </p>
          <button
            className="btn btn-lg btn-secondary lg:btn-primary mb-5 w-[20rem] lg:mr-20 "
            onClick={() => handleSelectGender("men")}
          >
            Shop Men
          </button>
          <button
            className="btn btn-lg btn-secondary lg:btn-primary w-[20rem]"
            onClick={() => handleSelectGender("women")}
          >
            Shop Women
          </button>
        </div>
      </header>

      {/* FEATURED SECTION */}
      <section>
        <div className="mt-10">
          <h1
            className="text-center text-3xl lg:text-5xl lg:m-28"
            data-aos-duration="1500"
            data-aos="fade-left"
            data-aos-once="true"
          >
            Featured Items
          </h1>
          <div
            className="divider"
            data-aos-duration="1500"
            data-aos="fade"
            data-aos-once="true"
          >
            <IoShirtSharp className="text-5xl text-gray-500" />
          </div>
          <div
            className="featured-cards grid grid-cols-2 gap-10 p-5 lg:flex lg:m-10"
            data-aos-duration="1500"
            data-aos="fade"
            data-aos-once="true"
          >
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
          <div className="left flex flex-col max-w-[50%] justify-center p-5 items-start text-lg lg:text-3xl">
            <p
              data-aos-duration="1500"
              data-aos="fade-right"
              data-aos-once="true"
              data-aos-anchor-placement="top-center"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut sequi,
              voluptate veniam, ratione voluptatum.
            </p>
          </div>
          <div className="right h-full w-6/12 lg:h-6/12 lg:w-[30%]">
            <figure>
              <img
                src={ModelMen}
                alt="Men's Model"
                className="overflow-hidden object-cover w-[15rem] h-full object-center lg:w-full "
                data-aos-duration="1500"
                data-aos="fade"
                data-aos-once="true"
                // data-aos-anchor-placement="top-center"
                // data-aos-offset="200"
              />
            </figure>
          </div>
        </div>

        <div className="divider"></div>
        {/* 
        <div className="top flex items-center justify-between w-full">
          <div className="left flex flex-col max-w-[50%] justify-center p-5 items-start text-lg lg:text-3xl">
            <p
              data-aos-duration="1500"
              data-aos="fade-right"
              data-aos-once="true"
              data-aos-anchor-placement="top-center"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut sequi,
              voluptate veniam, ratione voluptatum.
            </p>
          </div>
          <div className="right h-full w-6/12 lg:h-6/12 lg:w-[30%]">
            <figure>
              <img
                src={ModelMen}
                alt="Men's Model"
                className="overflow-hidden object-cover w-[15rem] h-full object-center lg:w-full "
                data-aos-duration="1500"
                data-aos="fade"
                data-aos-once="true"
                data-aos-anchor-placement="center-top"
                // data-aos-offset="300"
              />
            </figure>
          </div>
        </div> */}

        <div className="bottom flex items-center justify-between w-full">
          <div className="left h-full w-6/12 lg:w-[28%]">
            <figure>
              <img
                src={ModelWomen}
                alt="Women's Model"
                className="overflow-hidden object-cover w-[15rem] h-full object-center lg:w-full"
                data-aos-duration="1500"
                data-aos="fade"
                data-aos-once="true"
                // data-aos-offset="200"
                // data-aos-anchor-placement="center-top"
              />
            </figure>
          </div>
          <div className="right flex flex-col max-w-[50%] justify-center p-5 items-start text-lg lg:text-3xl">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Excepturi voluptatibus tempora.
            </p>
          </div>
        </div>
      </section>

      {/* INFO SECTION */}
      <section className="text-center lg:p-10">
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
                  <img src={InfoPic1} alt="Pic of clothes" />
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
            className="mt-16 bg-base-300 lg:bg-base-100 lg:mt-0"
            data-aos="fade"
            data-aos-once="true"
            data-aos-anchor-placement="top-center"
            data-aos-delay="100"
            data-aos-duration="1500"
          >
            <div className="h-[35rem]">
              <div className="avatar mt-10 lg:mt-0">
                <div className="rounded-full h-[15rem] w-[15rem]">
                  <img src={InfoPic2} alt="Pic of clothes" />
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
                <div className="rounded-full h-[15rem] w-[15rem]">
                  <img src={InfoPic3} alt="Pic of clothes" />
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
