"use client";
import { useEffect, useState } from "react";

export default function useAuth() {
  const [user, setUser] = useState<{ email: string; id: string; name: string } | null>(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch("/api/auth", {
          credentials: "include", // ✅ ensures cookies are sent
        });

        if (!response.ok) {
          setUser(null);
          return;
        }

        const data = await response.json();
       
        setUser(data ?? null);
      } catch (err) {
        setUser(null);
      } finally {
        setPending(false);
      }
    };

    getUser();
  }, []);

  return { user, pending };
}
