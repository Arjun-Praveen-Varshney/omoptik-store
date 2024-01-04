import React from "react";

const bills = ({ bills }) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">All Bills</h1>
      <ul className="w-full max-w-md">
        {bills.map((bill) => (
          <li
            key={bill.id}
            className="bg-white shadow-md rounded-md p-4 mb-4 flex items-center justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold">{bill.title}</h2>
              <p className="text-gray-500">{bill.date}</p>
            </div>
            <span className="text-green-500">${bill.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default bills;
