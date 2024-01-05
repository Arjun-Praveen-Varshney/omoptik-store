"use client";
import { useEffect, useState } from "react";
import { getDocs, collection, db } from "../../firebaseConfig";

const bills = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const fetchBills = async () => {
      const querySnapshot = await getDocs(collection(db, "bills"));
      const billData = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        billData.push(doc.data());
      });
      setBills(billData);
      // console.log(billData);
    };

    fetchBills();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Bills</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {bills.map((item) => (
          <div key={item.name} className="bg-white p-4 rounded shadow-md">
            <h2 className="text-lg font-bold">{item.name}</h2>
            <p className="text-gray-500">Balance: {item.balance}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default bills;
