import React from "react";
import { useInventory } from "../contexts/InventoryProvider";
import { useNavigate } from "react-router-dom";
import { INVENTORY } from "../utils/reducerTypes";

export default function Departments() {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <DeptCard deptName="Kitchen" />
      <DeptCard deptName="Toys" />
      <DeptCard deptName="Clothing" />
    </div>
  );
}

function DeptCard({ deptName }) {
  const { dispatch } = useInventory();
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        dispatch({
          type: INVENTORY.FILTERS,
          payload: { name: "department", value: deptName.toLowerCase() },
        });
        navigate("/products");
      }}
      className="h-fit w-auto cursor-pointer rounded-md bg-gray-200 p-6 text-center shadow-md"
    >
      <h1 className="text-2xl font-semibold">{deptName}</h1>
    </div>
  );
}
