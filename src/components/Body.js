import { useEffect, useState } from "react";
// import resList from "../utils/mockData";
import Card from "./Card";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [res, setRes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.2873787&lng=83.8262197&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        // "https://corsproxy.io/?url=https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.2873787&lng=83.8262197&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const json = await data.json();
      
      const restaurants =
        json?.data?.cards?.find(
          (card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants
        )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

      setRes(restaurants);
      setFilteredData(restaurants);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const search = searchText.toLowerCase();
    setFilteredData(
      res.filter((res) => res.info.name.toLowerCase().includes(search))
    );
    setSearchText("");
  };

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false) return (<h1>🔴 You are offline! Please check your internet connection.</h1>);



  return (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="search"
            placeholder="Search for restaurants"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button onClick={() => handleSearch()}>Search</button>
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
      {loading ? (
        <Shimmer />
      ) : filteredData.length === 0 ? (
        <h1 style={{ textAlign: "center" }}>No restaurant match your filter</h1>
      ) : (
        <div className="res-container">
          <Link to={"/restaurant/" + filteredData[0].info.id}>
            <Card resData={filteredData} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Body;
