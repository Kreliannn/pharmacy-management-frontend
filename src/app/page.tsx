"use client";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { successAlert, errorAlert } from "./utils/alert";

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "123") {
      successAlert("Login successful");
      router.push("/pages/supplierTab");
    } else {
      errorAlert("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-300 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm">
        
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/logo.jpg"
            alt="Logo"
            width={120}
            height={120}
            className="rounded-full shadow-lg"
          />
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-center text-purple-700 mb-6">
          Soler Medical Clinic And Infirmary
        </h1>

        {/* Form */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Enter username"
              className="focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter password"
              className="focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 transition-colors text-white font-semibold py-2"
            onClick={handleLogin}
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
}
