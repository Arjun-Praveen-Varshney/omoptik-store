"use client";
import { useState } from "react";
import { db, setDoc, doc } from "../../firebaseConfig";

const addStock = () => {
  const [sale, setSale] = useState({
    category: "",
    subcategory: "",
    sph: 0.0,
    cyl: 0.0,
    axis: "",
    add: "",
    pairs: 0,
  });

  const handleChange = (e) => {
    setSale({ ...sale, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await setDoc(
        doc(
          db,
          `stock/lenses/${sale.category}`,
          `${sale.category}${sale.subcategory.toUpperCase()}${sale.sph}${
            sale.cyl
          }x${sale.axis}_Add+${sale.add}`
        ),
        sale
      );
      alert("Stock added successfully!");
    } catch (error) {
      alert("Some error occurred! Please try again.");
    }
  };

  return (
    <div className="mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Enter Sale Details</h2>
      <form>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <select
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="category"
            name="category"
            onChange={handleChange}
            required={true}
          >
            <option value="">Select Category</option>
            <option value="CR">CR</option>
            <option value="PG">PG</option>
            <option value="WT Glass">WT Glass</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="subcategory"
          >
            Sub Category
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="subcategory"
            name="subcategory"
            type="text"
            placeholder="Enter Sub-Category"
            onChange={handleChange}
          />
        </div>
        <div className="flex mb-4">
          <div className="w-1/2 mr-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="sph"
            >
              Sph (2 decimals)
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="sph"
              name="sph"
              type="text"
              placeholder="Enter Sph"
              onChange={handleChange}
            />
          </div>
          <div className="w-1/2 ml-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="cyl"
            >
              Cyl (2 decimals)
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="cyl"
              name="cyl"
              type="text"
              placeholder="Enter Cyl"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex mb-4">
          <div className="w-1/2 mr-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="axis"
            >
              Axis
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="axis"
              name="axis"
              type="text"
              placeholder="Enter axis"
              onChange={handleChange}
            />
          </div>
          <div className="w-1/2 ml-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="add"
            >
              Add (2 decimals)
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="add"
              name="add"
              type="text"
              placeholder="Enter Add"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="pairs"
          >
            No. of Pairs
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="pairs"
            name="pairs"
            type="number"
            placeholder="Enter number of pairs"
            onChange={handleChange}
          />
        </div>
        <button
          className="bg-blue-500 focus:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default addStock;
