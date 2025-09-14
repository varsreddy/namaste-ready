import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ItemCard from "./ItemCard";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenu = () => {
  const [expandedCategory, setExpandedCategory] = useState(null); // store categoryId
  const { resId } = useParams();

  const resMenu =  useRestaurantMenu(resId);
  console.log("Restaurant Menu Data:", resMenu);

  if (!resMenu) {
    return <h2>Loading menu...</h2>;
  }

  // restaurant info
  const {
    name,
    cuisines,
    costForTwo,
    city,
    sla,
    totalRatingsString,
    areaName,
    avgRating,
  } = resMenu?.cards?.[2]?.card?.card?.info || {};

  // extract group cards
  const groupCards =
    resMenu?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

  // filter only categories
  const categoriesArr = groupCards.filter(
    (c) =>
      c.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
  );

  

  console.log("Categories:", categoriesArr);

  return (
    <div className="restaurant-menu">
      {/* Restaurant Info */}
      <h1 className="restaurant-title">{name || "Restaurant"}</h1>
      <div className="card">
        <h2 className="restaurant-rating">
          ⭐ {avgRating} ({totalRatingsString}) • ₹
          {costForTwo ? costForTwo / 100 : "N/A"} for two
        </h2>
        <p>{cuisines?.join(", ") || "Various Cuisines"}</p>
        <p>
          {areaName || "Unknown Area"}, {city || "Unknown City"}
        </p>
        <p>
          {sla?.minDeliveryTime && sla?.maxDeliveryTime
            ? `${sla.minDeliveryTime} - ${sla.maxDeliveryTime} mins`
            : "Unknown Delivery Time"}
        </p>
      </div>

      {/* Menu Categories */}
{categoriesArr.map((category) => (
  <div
    key={category.card.card.categoryId}
    className="category-section"
  >
    {/* Category Title */}
    <h3
      style={{ cursor: "pointer" }}
      onClick={() =>
        setExpandedCategory(
          expandedCategory === category.card.card.categoryId
            ? null
            : category.card.card.categoryId
        )
      }
    >
      {category.card.card.title} (
      {
        // count total items across all nested categories
        category.card.card.categories?.reduce(
          (acc, cat) => acc + (cat.itemCards?.length || 0),
          0
        ) || 0
      }{" "}
      items){" "}
      {expandedCategory === category.card.card.categoryId ? "⬆" : "⬇"}
    </h3>

    {/* Items inside expanded category */}
    {expandedCategory === category.card.card.categoryId &&
      category.card.card.categories?.map((subCategory) => (
        <div key={subCategory.categoryId}>
          <h4>{subCategory.title}</h4>
          {subCategory.itemCards?.map((item) => (
            <Link to={``} key={item.card.info.id}>
              <ItemCard item={item.card.info} />
            </Link>
          ))}
        </div>
      ))}
  </div>
))}

    </div>
  );
};

export default RestaurantMenu;
