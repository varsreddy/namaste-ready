import { IMG_CDN_URL } from "../utils/constants";
import Shimmer from "./Shimmer";

const Card = ({ resData }) => {
  if (resData.length === 0) return <Shimmer />;
  return (
    <div className="res-card">
      {resData.length === 0
        ? "No restaurants found!!!"
        : resData.map((res) => {
            const info = res.info;

            return (
              <div className="res-item" key={info.id}>
                <img
                  src={IMG_CDN_URL + res.info.cloudinaryImageId}
                  alt={info.name}
                  className="res-image"
                />
                <div className="res-info">
                  <h3>{info.name}</h3>
                  <p>
                    📍 {info.locality}, {info.areaName}
                  </p>
                  <p>🍽️ {info.cuisines?.join(", ")}</p>
                  <p>
                    💰{" "}
                    {`₹${
                      parseInt(info.costForTwo.replace(/[^0-9]/g, "")) / 2
                    } for each`}
                  </p>
                  <p>
                    ⭐ {info.avgRating} ({info.totalRatingsString})
                  </p>
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default Card;
