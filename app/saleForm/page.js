"use client";
import { useState } from "react";
import { db, setDoc, doc, updateDoc, getDoc } from "../../firebaseConfig";

const SaleForm = () => {
  const [sale, setSale] = useState({
    buyerName: "",
    date: new Date().toISOString().split("T")[0],
    category: "",
    subcategory: "",
    sph: 0.0,
    cyl: 0.0,
    axis: "",
    add: "",
    pairs: 0,
    price: 0,
    amount: 0,
    paid: 0,
  });

  const handleChange = (e) => {
    setSale({ ...sale, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalSale = {
      ...sale,
      amount: parseFloat(sale.pairs) * parseInt(sale.price),
    };
    setSale(finalSale);
    // console.log(sale);
    // console.log(finalSale)
    try {
      const billDocRef = doc(db, "bills", finalSale.buyerName.toLowerCase());
      const billDocSnap = await getDoc(billDocRef);

      let lensData = {};
      if (billDocSnap.exists()) {
        lensData = billDocSnap.data().lens || {};
      }

      if (!lensData[finalSale.date]) {
        lensData[finalSale.date] = [];
      }

      lensData[finalSale.date].push({
        add: finalSale.add,
        amount: finalSale.amount,
        axis: finalSale.axis,
        category: finalSale.category,
        cyl: finalSale.cyl,
        pairs: finalSale.pairs,
        price: finalSale.price,
        sph: finalSale.sph,
        subcategory: finalSale.subcategory,
      });

      await setDoc(
        billDocRef,
        { name: finalSale.buyerName, lens: lensData },
        { merge: true }
      );
      const docRef = doc(
        db,
        `stock/lenses/${finalSale.category}`,
        `${sale.category}${sale.subcategory.toUpperCase()}${sale.sph}${
          sale.cyl
        }x${sale.axis}_Add+${sale.add}`
      );
      const docSnap = await getDoc(docRef);
      let prevPairs = 0;
      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        prevPairs = await docSnap.data().pairs;
      } else {
        // docSnap.data() will be undefined in this case
        alert("Stock not found!");
      }
      await updateDoc(docRef, {
        pairs: prevPairs - finalSale.pairs,
      });
      alert("Sale added successfully!");
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
            htmlFor="buyerName"
          >
            Name of Buyer
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="buyerName"
            name="buyerName"
            type="text"
            placeholder="Enter buyer's name"
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="date"
          >
            Date
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="date"
            name="date"
            type="date"
            defaultValue={new Date().toISOString().split("T")[0]}
            onChange={handleChange}
          />
        </div>
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
              Add (1 decimal)
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
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="price"
          >
            Price (per pair)
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            name="price"
            type="number"
            placeholder="Enter price"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="amount"
          >
            Total Amount
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="amount"
            name="amount"
            type="number"
            readOnly={true}
            value={sale.pairs * sale.price}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="paid"
          >
            Paid (if any)
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="paid"
            name="paid"
            type="number"
            placeholder="Enter amount paid (if any)"
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

export default SaleForm;
