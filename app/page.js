import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-8 bg-gray-300">
      <div className="font-semibold text-3xl text-center">
        Where do you want to go?
      </div>
      <Link href="/saleForm">
        <button className="bg-green-500 focus:bg-green-600 text-white rounded-lg px-4 py-2 font-medium text-lg">
          Sale
        </button>
      </Link>
      <Link href="/buyForm">
        <button className="bg-yellow-500 focus:bg-yellow-600 text-white rounded-lg px-4 py-2 font-medium text-lg w-24">
          Buy
        </button>
      </Link>
      <Link href="/addStock">
        <button className="bg-orange-500 focus:bg-orange-600 text-white rounded-lg px-4 py-2 font-medium text-lg">
          Add Stock
        </button>
      </Link>
      <Link href="/Stock">
        <button className="bg-red-500 focus:bg-red-600 text-white rounded-lg px-4 py-2 font-medium text-lg">
          View Stock
        </button>
      </Link>
      <Link href="/bills">
        <button className="bg-purple-500 focus:bg-purple-600 text-white rounded-lg px-4 py-2 font-medium text-lg">
          View Bills
        </button>
      </Link>
    </main>
  );
}
