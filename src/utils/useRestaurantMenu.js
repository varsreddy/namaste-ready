import { useEffect, useState } from "react";
import { MENU_API } from "../utils/constants";

const useRestaurantMenu =  (resId) => {
    const [resMenu, setResMenu] = useState(null);
    useEffect(() => {
        const fetchMenu =  async ()=>{
        console.log("Fetching menu for resId:", resId);
        const data = await fetch(MENU_API + resId);

        if (!data.ok) {
          throw new Error("Failed to fetch menu: " + data.status);
        }
        
        const json = await data.json();
        console.log("Menu Data:", json.data);
        setResMenu(json.data);
    };

    fetchMenu();
  }, [resId]);

  return resMenu;
}

export default useRestaurantMenu;