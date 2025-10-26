import { ProductList } from "@/features/products/product-list"

export default function Home() {
  return (
    <div className="h-full space-y-12 pt-8">
      <h1 className="text-delft-blue-2 font-sans dark:text-indigo-400">Nossos Melhores Produtos</h1>
      <ProductList />
    </div>
  )
}
