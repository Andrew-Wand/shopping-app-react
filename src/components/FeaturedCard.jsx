import { useNavigate } from "react-router-dom";
import Fade from "react-reveal/Fade";

function FeaturedCard({ featuredItems, id }) {
  const navigate = useNavigate();
  return (
    <Fade up cascade>
      <div
        className="lg:max-w-[40%] hover:scale-110 transition ease-in tooltip"
        data-tip={featuredItems.name}
      >
        <div>
          <figure
            onClick={() => navigate(`/shop/${featuredItems.category}/${id}`)}
            className="cursor-pointer"
          >
            <img src={featuredItems.image} alt="Clothing" />
          </figure>
        </div>
      </div>
    </Fade>
  );
}

export default FeaturedCard;
