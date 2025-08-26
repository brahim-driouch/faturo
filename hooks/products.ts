"use client";

import { IResponse, ProductWithCategory } from "@/types";
import { useQuery } from "@tanstack/react-query";






const getProducts = async (businessId: string) => {
  const res = await fetch(`/api/products?businessId=${businessId}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Erreur lors de la récupération des produits");
  }
  const data = await res.json();
  return data;
}


export const useProducts = (businessId: string) => {
  return useQuery<IResponse<ProductWithCategory[]>>({
    queryKey: ["products", businessId],
    queryFn: () => getProducts(businessId),
    enabled: !!businessId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
}