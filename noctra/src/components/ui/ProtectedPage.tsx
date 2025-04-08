"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedPage({ children }: { children: ReactNode }) {
  const router = useRouter();

  // try to get the token, if theres none, redirect to /auth, else, dont render
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      router.push("/auth");
    }
  }, [router]);

  if (!children) {
    return null;
  }

  return <>{children}</>; // Render children if authenticated
}
