import { useNavigate } from "react-router-dom";

function FeaturedCard({ featuredItems, id }) {
  const navigate = useNavigate();
  return (
    <div className="">
      <div className="">
        <figure
          onClick={() => navigate(`/shop/${featuredItems.category}/${id}`)}
        >
          <img src={featuredItems.image} alt="Clothing" />
        </figure>
      </div>
    </div>
  );
}

export default FeaturedCard;
