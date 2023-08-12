import React from "react";
import { useParams } from "react-router-dom";
import { useInventory } from "../contexts/InventoryProvider";

export default function ProductDetails() {
  const { productId } = useParams();
  const { filteredStocks } = useInventory();

  const product = filteredStocks?.find(({ id }) => id == productId);

  if (product) {
    const {
      imageUrl,
      name,
      description,
      price,
      stock,
      delivered,
      supplier,
      sku,
    } = product;

    return (
      <section>
        <img src={imageUrl} alt="" className="max-w-[300px]" />
        <div className="capitalize">
          <h1 className="border border-gray-400 p-2">
            <strong>name:</strong> {name}
          </h1>
          <p className="border border-gray-400 p-2">
            <strong>description:</strong> {description}
          </p>
          <p className="border border-gray-400 p-2">
            <strong>price:</strong> ${price}
          </p>
          <p className="border border-gray-400 p-2">
            <strong>stock:</strong> {stock}
          </p>
          <p className="border border-gray-400 p-2">
            <strong>supplier:</strong> {supplier}
          </p>
          <p className="border border-gray-400 p-2">
            <strong>sku:</strong> {sku}
          </p>
          <p className="border border-gray-400 p-2">
            <strong>delivered:</strong> {delivered}
          </p>
        </div>
      </section>
    );
  }
}
