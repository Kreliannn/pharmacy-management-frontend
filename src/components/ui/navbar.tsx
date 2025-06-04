"use client"
import Link from "next/link";
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react";

export default function Navbar() {

  const pathname = usePathname(); // example: "/pages/supplierTab"
  const [lastSegment, setLastSegment] = useState("");

  useEffect(() => {
    const segments = pathname.split("/").filter(Boolean);
    setLastSegment(segments[segments.length - 1]);
  }, [pathname]);

  return (
<nav className="w-full bg-purple-600 shadow-md mb-4">
  <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
    {/* Logo / Brand */}
    <div className="text-white text-xl font-bold tracking-wide"> {lastSegment.split("T")[0]} page</div>

    {/* Navigation Links */}
    <div className="flex items-center gap-6">
      <Link
        href="/pages/productTab"
        className="text-white hover:text-purple-200 transition-colors font-medium"
      >
        Product
      </Link>

      <Link
        href="/pages/supplierTab"
        className="text-white hover:text-purple-200 transition-colors font-medium"
      >
        Supplier
      </Link>

      <Link
        href="/pages/inventoryTab"
        className="text-white hover:text-purple-200 transition-colors font-medium"
      >
        Inventory
      </Link>

      <Link
        href="/pages/salesTransactionTab"
        className="text-white hover:text-purple-200 transition-colors font-medium"
      >
        Sales
      </Link>

      <Link
        href="/pages/demandTab"
        className="text-white hover:text-purple-200 transition-colors font-medium"
      >
        Demand
      </Link>

      <Link
        href="/pages/reportTab"
        className="text-white hover:text-purple-200 transition-colors font-medium"
      >
        Report
      </Link>

      <Link
        href="/"
        className="text-red-200 hover:text-white transition-colors font-semibold"
      >
        Logout
      </Link>
    </div>
  </div>
</nav>

  );
}
