"use client";
import { useEffect, useState } from "react";
import { getDocs, collection, db } from "../../firebaseConfig";

const Stock = () => {
  const [stock, setStock] = useState([]);

  useEffect(() => {
    const fetchStock = async () => {
      const querySnapshot = await getDocs(collection(db, "lenses"));
      const stockData = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        stockData.push(doc.data());
      });
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
            key={item.category + item.sph + item.cyl + item.axis + item.add}
            className="bg-white p-4 rounded shadow-md"
          >
            <h2 className="text-lg font-bold">
              {`${item.category}${item.sph != "0.00" ? item.sph : ""}${
                item.cyl != "0.00" ? item.cyl : ""
              }${item.axis != "0" ? `x${item.axis}` : ""}${
                item.add != "0.00" ? `/@+${item.add}` : ""
              }`}
            </h2>
            <p className="text-gray-500">Quantity: {item.pairs}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stock;
