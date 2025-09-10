import { useEffect, useState } from "react";
// import resList from "../utils/mockData";
import Card from "./Card";

const Body = () => {
  const [res, setRes] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.2873787&lng=83.8262197&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    // Locate the card that contains restaurants
    const restaurants =
      json?.data?.cards?.find(
        (card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants
      )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

    setRes(restaurants);
  };

  return (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input type="search" placeholder="Search for food and hotels" />
          <button>Search</button>
        </div>

        <button
          onClick={() => {
            const filteredData = res.filter((res) => res.info.avgRating > 4);
            setRes(filteredData);
          }}
        >
          Top rated restaurants
        </button>
      </div>

      <div className="res-container">
        <Card resData={res} />
      </div>
    </div>
  );
};

export default Body;
