"use client";

import { ProductCategoryType } from "@/types";
import { useQuery } from "@tanstack/react-query";



const getCategories = async (businessId:string) => {
    const response = await fetch(`/api/categories?businessId=${businessId}`, {
        cache: "no-store",
      })
    if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      return data

}


export  const useCategories = (businessId:string) => {
  return useQuery<{ data: ProductCategoryType[],status:"error"|"success",message:string}>({
    queryKey: ["product-categories", businessId],
    queryFn: () => getCategories(businessId),
    enabled: !!businessId, // Only run the query if businessId is available,
    staleTime: 1000 * 60 * 60, 
  });
}