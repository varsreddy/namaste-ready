import { useEffect, useState } from "react";
import Card from "./Card";

const Shimmer = () => {
  return (
    <div className="shimmer-container">
      {Array(10)
        .fill("")
        .map((_, i) => (
          <div key={i} className="shimmer-card"></div>
        ))}
    </div>
  );
};


export default Shimmer;