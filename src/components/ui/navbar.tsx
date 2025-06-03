import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-blue-100 shadow-sm p-4 mb-5">
      <div className="max-w-7xl mx-auto flex justify-end gap-6">
        <Link
          href="/pages/supplierTab"
          className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
        >
          Supplier
        </Link>
        <Link
          href="/pages/productTab"
          className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
        >
          Product
        </Link>
        <Link
          href="/pages/salesTransactionTab"
          className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
        >
          Sales Transaction
        </Link>
        <Link
          href="/pages/inventory"
          className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
        >
          Inventory
        </Link>
        <Link
          href="/pages/demandTab"
          className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
        >
          Demand
        </Link>
        <Link
          href="/"
          className="text-red-600 hover:text-red-800 transition-colors font-medium"
        >
          Logout
        </Link>
      </div>
    </nav>
  );
}
