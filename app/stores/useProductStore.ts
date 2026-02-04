import { defineStore } from 'pinia'

export interface Product {
  id: string
  name: string
  createdAt: string
}

export const useProductStore = defineStore('products', () => {
  const products = ref<Product[]>([]);
  const isLoaded = ref(false);

  async function loadProducts() {
    if (!isLoaded.value) {
      isLoaded.value = true;
    }
  }

  function addProduct(name: string) {
    if (!name.trim()) return false;
    
    const newProduct: Product = {
      id: Math.random().toString(36).slice(2, 9),
      name,
      createdAt: new Date().toISOString()
    };
    
    products.value.unshift(newProduct);
    return true;
  }

  function removeProduct(id: string) {
    products.value = products.value.filter(p => p.id !== id);
  }

  function clearProducts() {
    products.value = [];
  }

  return {
    products,
    isLoaded,
    loadProducts,
    addProduct,
    removeProduct,
    clearProducts
  }
}, {
  persist: true
});
