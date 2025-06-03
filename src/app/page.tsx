"use client"
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

    if(username == "admin" && password == "123"){
      successAlert("Login successful");
      router.push("/pages/supplierTab");
    }
    else {
      errorAlert("Invalid username or password");
    }
  
      
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
        
        <h1 className="text-2xl font-semibold text-center mb-4">Login</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <Input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="enter username" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <Input value={password}  onChange={(e) => setPassword(e.target.value)} type="password" placeholder="enterpassword" required />
          </div>

          <Button type="submit" className="w-full" onClick={handleLogin}  >
            Sign In
          </Button>
        </div>

      </div>
    </div>
  );
}
