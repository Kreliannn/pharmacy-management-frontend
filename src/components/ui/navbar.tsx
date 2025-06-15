"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image"; // ✅ Import Image component

const getPageName = (page: string) => {
  switch (page) {
    case "product":
      return "Product Management";
    case "supplier":
      return "Supplier Management";
    case "sales":
      return "Sales Transaction";
    case "inventory":
      return "Inventory Control";
    case "demand":
      return "Demand";
    case "report":
      return "Sales Report";
    default:
      return "not found";
  }
};

export default function Navbar() {
  const pathname = usePathname();
  const [lastSegment, setLastSegment] = useState("");

  useEffect(() => {
    const segments = pathname.split("/").filter(Boolean);
    setLastSegment(segments[segments.length - 1]);
  }, [pathname]);

  return (
    <nav className="w-full bg-purple-600 shadow-md mb-4">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo and Page Name */}
        <div className="flex items-center gap-4">
          <Image
            src="/logo.jpg"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-white text-xl font-bold tracking-wide">
            {getPageName(lastSegment.split("T")[0])}
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <Link
            href="/pages/productTab"
            className="text-white hover:text-purple-200 transition-colors font-medium text-sm"
          >
            Product Management
          </Link>
          <Link
            href="/pages/supplierTab"
            className="text-white hover:text-purple-200 transition-colors font-medium text-sm"
          >
            Supplier Management
          </Link>
          <Link
            href="/pages/inventoryTab"
            className="text-white hover:text-purple-200 transition-colors font-medium text-sm"
          >
            Inventory Control
          </Link>
          <Link
            href="/pages/salesTransactionTab"
            className="text-white hover:text-purple-200 transition-colors font-medium text-sm"
          >
            Sales Transaction
          </Link>
          <Link
            href="/pages/demandTab"
            className="text-white hover:text-purple-200 transition-colors font-medium text-sm"
          >
            Demand
          </Link>
          <Link
            href="/pages/reportTab"
            className="text-white hover:text-purple-200 transition-colors font-medium text-sm"
          >
            Sales Report
          </Link>
          <Link
            href="/"
            className="text-white hover:text-white transition-colors font-semibold text-sm"
          >
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
}
