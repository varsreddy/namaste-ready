// ItemCard.js
import React from "react";

const ItemCard = ({ item }) => {
  if (!item) return console.log(item);

  const { name, defaultPrice, price, description, imageId, ratings } = item;

  return (
    <div
      className="item-card"
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "10px",
        marginBottom: "10px",
        maxWidth: "600px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <h4 style={{ margin: "0 0 5px 0" }}>{name}</h4>
          <p style={{ margin: "0 0 5px 0", fontWeight: "bold" }}>₹{(defaultPrice || price || 0) / 100}</p>
          <p style={{ margin: 0 }}>
           {<span>⭐ {ratings?.aggregatedRating?.rating} ({ratings?.aggregatedRating?.ratingCount})</span>} 
          </p>
        </div>
        {imageId && (
          <img
            src={`https://media-assets.swiggy.com/swiggy/image/upload/${imageId}`}
            alt={name}
            style={{ width: "120px", height: "auto", borderRadius: "8px", marginLeft: "10px" }}
          />
        )}
      </div>

      {/* Description below */}
      {description && <p style={{ marginTop: "10px" }}>{description}</p>}
    <hr/>
    </div>
    
  );
};

export default ItemCard;
