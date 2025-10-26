import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { getProducts, getProductsById } from "./actions"

export const useGetProducts = (page: number) => {
  return useQuery({
    queryKey: ["products", page],
    queryFn: () => getProducts(page),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData
  })
}

export const useGetProductsById = (ids: number[], enabled: boolean) => {
  return useQuery({
    queryKey: ["products", ids],
    queryFn: () => getProductsById(ids),
    enabled
  })
}
