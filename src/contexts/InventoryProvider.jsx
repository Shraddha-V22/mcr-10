import { createContext, useReducer } from "react";
import { inventoryData } from "../data/inventoryData";
import { inventoryReducer } from "../reducers/inventoryReducer";
import { useContext } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { INVENTORY } from "../utils/reducerTypes";

const InventoryContext = createContext(null);

const initialInventory = {
  inventory: [...inventoryData],
  department: "all",
  lowStockItems: false,
  sortBy: "name",
};

export default function InventoryProvider({ children }) {
  const [stocksData, dispatch] = useReducer(inventoryReducer, initialInventory);

  const filteredStocks = useMemo(() => {
    let filteredData =
      stocksData.department === "all"
        ? stocksData.inventory
        : stocksData.inventory?.filter(
            ({ department }) =>
              department.toLowerCase() === stocksData.department
          );

    filteredData = stocksData.lowStockItems
      ? filteredData?.filter(({ stock }) => stock <= 10)
      : filteredData;

    filteredData =
      stocksData.sortBy === "name"
        ? [...filteredData].sort((a, b) =>
            a[stocksData.sortBy].localeCompare(b[stocksData.sortBy])
          )
        : [...filteredData].sort(
            (a, b) => a[stocksData.sortBy] - b[stocksData.sortBy]
          );

    return filteredData;
  }, [stocksData]);

  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem("inventory"));
    if (existingData) {
      dispatch({
        type: INVENTORY.SET_INVENTORY,
        payload: existingData,
      });
    } else {
      dispatch({
        type: INVENTORY.SET_INVENTORY,
        payload: stocksData.inventory,
      });
    }
  }, []);

  return (
    <InventoryContext.Provider value={{ stocksData, dispatch, filteredStocks }}>
      {children}
    </InventoryContext.Provider>
  );
}

export const useInventory = () => useContext(InventoryContext);
