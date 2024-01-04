"use client";
import { useState } from "react";
import { db, addDoc, collection } from "../../firebaseConfig";
import Select from "react-select";
import { categoryOptions } from "../helpers";

const addStock = () => {
  const [sale, setSale] = useState({
    category: "",
    sph: "0.00",
    cyl: "0.00",
    axis: "0",
    add: "0.00",
    pairs: 0,
  });

  const handleChange = (e) => {
    setSale({ ...sale, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (selectedOption) => {
    setSale({ ...sale, category: selectedOption.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "lenses"), sale);
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
          <Select
            // placeholder="Select Category"
            instanceId="category-select-addStock"
            id="category"
            name="category"
            options={categoryOptions}
            isSearchable={true}
            onChange={(selectedOption) => handleCategoryChange(selectedOption)}
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
              defaultValue={"0.00"}
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
              defaultValue={"0.00"}
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
              defaultValue={"0"}
            />
          </div>
          <div className="w-1/2 ml-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="add"
            >
              Add (2 decimals, NO '+')
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="add"
              name="add"
              type="text"
              // defaultValue={"+0.00"}
              placeholder="+0.00"
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
