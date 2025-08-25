// hooks/auth.ts
"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
  
async function fetchUser() {
  const res = await fetch("/api/auth", { credentials: "include" });
  if (!res.ok) return null;
  const data = await res.json();
  
  return data ?? null;
}

export default function useAuth() {
  return useQuery({
    queryKey: ["auth"],
    queryFn: fetchUser,
    
  });
}
