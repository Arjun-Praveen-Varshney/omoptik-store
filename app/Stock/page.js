"use client";
import { useEffect, useState } from "react";
import { getDocs, collection, db } from "../../firebaseConfig";

const Stock = () => {
  const [stock, setStock] = useState([]);

  useEffect(() => {
    const fetchStock = async () => {
      const categories = ["CR", "PG", "WT Glass"];
      let stockData = [];
      for (let category of categories) {
        const querySnapshot = await getDocs(
          collection(db, `stock/lenses/${category}`)
        );
        const categoryData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          category,
        }));
        stockData = [...stockData, ...categoryData];
      }
      setStock(stockData);
      // console.log(stockData);
    };

    fetchStock();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Stock</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {stock.map((item) => (
          <div
            key={
              item.category +
              item.subcategory +
              item.sph +
              item.cyl +
              item.axis +
              item.add
            }
            className="bg-white p-4 rounded shadow-md"
          >
            <h2 className="text-lg font-bold">
              {`${item.category}${item.subcategory}${
                item.sph != "0.00" ? item.sph : ""
              }${item.cyl != "0.00" ? item.cyl : ""}${
                item.axis != "0" ? `x${item.axis}` : ""
              }${item.add != "0.00" ? `/@+${item.add}` : ""}`}
            </h2>
            <p className="text-gray-500">Quantity: {item.pairs}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stock;
