import React from "react";
import { useInventory } from "../contexts/InventoryProvider";
import { INVENTORY } from "../utils/reducerTypes";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const { filteredStocks } = useInventory();
  return (
    <section className="p-4">
      <ProductHeader />
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200 font-semibold capitalize">
            <td className="border border-gray-400 p-2">Image</td>
            <td className="border border-gray-400 p-2">Name</td>
            <td className="border border-gray-400 p-2">Description</td>
            <td className="border border-gray-400 p-2">Price</td>
            <td className="border border-gray-400 p-2">Stock</td>
            <td className="border border-gray-400 p-2">Supplier</td>
          </tr>
        </thead>
        <tbody>
          {filteredStocks?.length > 0 ? (
            filteredStocks?.map((product) => (
              <ProductTableRow key={product.id} product={product} />
            ))
          ) : (
            <tr>
              <td>No Product Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}

function ProductTableRow({ product }) {
  const navigate = useNavigate();

  const { id, imageUrl, name, description, price, stock, supplier } = product;
  return (
    <tr className="">
      <td className="border border-gray-400 p-2">
        <img src={imageUrl} alt={name} className="h-auto w-40" />
      </td>
      <td
        onClick={() => navigate(`/product/${id}`)}
        className="border border-gray-400 p-2 hover:cursor-pointer hover:underline"
      >
        {name}
      </td>
      <td className="border border-gray-400 p-2">{description}</td>
      <td className="border border-gray-400 p-2">{price}</td>
      <td className="border border-gray-400 p-2">{stock}</td>
      <td className="border border-gray-400 p-2">{supplier}</td>
    </tr>
  );
}

function ProductHeader() {
  const navigate = useNavigate();
  const {
    dispatch,
    stocksData: { department },
  } = useInventory();

  return (
    <header className="m-4 flex justify-between p-2">
      <h1 className="text-2xl font-semibold">Products</h1>
      <select
        name="department"
        id="department"
        onChange={(e) =>
          dispatch({
            type: INVENTORY.FILTERS,
            payload: { name: e.target.name, value: e.target.value },
          })
        }
        value={department}
        className="rounded-md border border-gray-400 px-2 py-1 outline-none"
      >
        <option value="all">All Departments</option>
        <option value="kitchen">Kitchen</option>
        <option value="clothing">Clothing</option>
        <option value="toys">Toys</option>
      </select>
      <div className="flex items-center gap-2 rounded-md border border-gray-400 px-2">
        <input
          type="checkbox"
          name="lowStockItems"
          id="low-stock"
          onChange={(e) =>
            dispatch({
              type: INVENTORY.FILTERS,
              payload: { name: e.target.name, value: e.target.checked },
            })
          }
        />
        <label htmlFor="low-stock">Low stock items</label>
      </div>
      <select
        name="sortBy"
        id="sort-by"
        onChange={(e) =>
          dispatch({
            type: INVENTORY.FILTERS,
            payload: { name: e.target.name, value: e.target.value },
          })
        }
        className="rounded-md border border-gray-400 px-2 py-1 outline-none"
      >
        <option value="name">Name</option>
        <option value="price">Price</option>
        <option value="stock">stock</option>
      </select>
      <button
        className="rounded-md bg-blue-600 px-2 py-1 text-white"
        onClick={() => navigate("/add-new-product")}
      >
        New
      </button>
    </header>
  );
}
