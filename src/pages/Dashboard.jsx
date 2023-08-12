import React from "react";
import { useInventory } from "../contexts/InventoryProvider";

export default function Dashboard() {
  const {
    stocksData: { inventory },
  } = useInventory();

  const totalStock = inventory?.reduce((acc, { stock }) => acc + +stock, 0);

  const totalDelivered = inventory?.reduce(
    (acc, { delivered }) => acc + +delivered,
    0
  );

  const lowStockItems = inventory?.reduce(
    (acc, { stock }) => (stock <= 10 ? acc + 1 : acc),
    0
  );

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <StatsCard
        quantity={totalStock}
        text="Total Stock"
        color="text-green-600"
      />
      <StatsCard
        quantity={totalDelivered}
        text="Total Delivered"
        color="text-orange-500"
      />
      <StatsCard
        quantity={lowStockItems}
        text="Low Stock Items"
        color="text-red-600"
      />
    </div>
  );
}

function StatsCard({ quantity, text, color }) {
  return (
    <div className="h-fit w-auto rounded-md bg-gray-200 p-6 text-center shadow-md">
      <h1 className={`${color} text-2xl font-semibold`}>{quantity}</h1>
      <p className="text-lg">{text}</p>
    </div>
  );
}
