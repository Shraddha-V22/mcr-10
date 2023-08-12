import { useState } from "react";
import { useInventory } from "../contexts/InventoryProvider";
import { INVENTORY } from "../utils/reducerTypes";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { objHasAllValues } from "../utils/objHasAllValues";
import { urlValidator } from "../utils/urlValidator";

export default function NewProduct() {
  const navigate = useNavigate();
  const { dispatch } = useInventory();
  const [productInputs, setProductInputs] = useState({
    department: "",
    name: "",
    description: "",
    price: 0,
    stock: 0,
    sku: "",
    supplier: "",
    delivered: 0,
    imageUrl: "",
  });

  function inputChangeHandler(e) {
    const { name, value } = e.target;
    setProductInputs((prev) => ({ ...prev, [name]: value }));
  }

  function addNewProduct(e) {
    e.preventDefault();
    if (!urlValidator(productInputs.imageUrl)) {
      toast.error("Please provide valid image url!");
      return;
    }
    // if (!objHasAllValues(productInputs)) {
    //   toast.error("Please fill all the details!");
    //   return;
    // }
    dispatch({ type: INVENTORY.ADD_PRODUCT, payload: productInputs });
    navigate("/products");
    toast.success("Product added successfully!");
  }

  return (
    <section className="mx-auto flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-semibold">Add new product</h1>
      <form
        onSubmit={addNewProduct}
        className="flex max-w-[400px] flex-col gap-4 min-[600px]:w-[400px]"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="dept">Department:</label>
          <select
            name="department"
            id="dept"
            onChange={inputChangeHandler}
            className="rounded-md border border-gray-400 px-2 py-1 outline-none"
          >
            <option>Select Department</option>
            <option value="kitchen">Kitchen</option>
            <option value="toys">Toys</option>
            <option value="clothing">Clothing</option>
          </select>
        </div>
        <InputComponent
          onChange={inputChangeHandler}
          name="name"
          label="Name"
        />
        <div className="flex flex-col gap-1">
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="2"
            className="rounded-md border border-gray-400 px-2 py-1 text-sm outline-none"
            onChange={inputChangeHandler}
          ></textarea>
        </div>
        <InputComponent
          onChange={inputChangeHandler}
          name="price"
          label="Price"
          type="number"
        />
        <InputComponent
          onChange={inputChangeHandler}
          name="stock"
          label="Stock"
          type="number"
        />
        <InputComponent onChange={inputChangeHandler} name="sku" label="SKU" />
        <InputComponent
          onChange={inputChangeHandler}
          name="supplier"
          label="Supplier"
        />
        <div className="flex flex-col gap-1">
          <label htmlFor="delivered">Delivered:</label>
          <input
            className="rounded-md border border-gray-400 px-2 py-1 indent-1 text-sm outline-none"
            name="delivered"
            type="number"
            id="delivered"
            value={0}
          />
        </div>
        <InputComponent
          onChange={inputChangeHandler}
          name="imageUrl"
          label="Image URL"
        />

        <button
          className="rounded-md bg-blue-600 px-2 py-1 text-white"
          type="submit"
        >
          Add Product
        </button>
      </form>
    </section>
  );
}

function InputComponent({ name, label, type = "text", onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name}>{label}:</label>
      <input
        className="rounded-md border border-gray-400 px-2 py-1 indent-1 text-sm outline-none"
        name={name}
        type={type}
        id={name}
        onChange={onChange}
      />
    </div>
  );
}
