<script setup lang="ts">
useSeoMeta({
  title: 'Список продуктів',
  description: 'Керуйте своїм списком продуктів'
});

const productStore = useProductStore();
const { products, isLoaded } = storeToRefs(productStore);

const productName = ref('');

onMounted(async () => {
  await productStore.loadProducts();
});

const handleAddProduct = () => {
  if (!productName.value.trim()) return;
  
  const success = productStore.addProduct(productName.value);
  if (success) {
    productName.value = '';
  }
};

const confirmClear = () => {
  if (confirm('Ви впевнені, що хочете видалити всі продукти?')) {
    productStore.clearProducts();
  }
};
</script>

<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-neutral-900">
    <UContainer class="py-8">
      <div class="max-w-3xl mx-auto">
        
        <header class="mb-8 text-center sm:text-left">
          <h1 class="text-3xl font-bold text-neutral-900 dark:text-white">
            Список продуктів
          </h1>
          <p class="text-neutral-500 dark:text-neutral-400 mt-2">
            Додавайте та керуйте своїми продуктами
          </p>
        </header>

        <UCard class="mb-8">
          <form @submit.prevent="handleAddProduct" class="flex flex-col gap-4">
            <UField label="Назва продукту" required>
              <UInput
                v-model="productName"
                placeholder="Наприклад: Кефір"
                size="xl"
                icon="i-lucide-shopping-basket"
                class="w-full"
                :disabled="!isLoaded"
              />
            </UField>

            <div class="flex gap-3">
              <UButton
                type="submit"
                label="Додати"
                icon="i-lucide-plus"
                size="lg"
                :disabled="!productName.trim() || !isLoaded"
              />

              <UButton
                v-if="products.length > 0"
                label="Очистити все"
                color="neutral"
                variant="subtle"
                icon="i-lucide-trash-2"
                size="lg"
                @click="confirmClear"
              />
            </div>
          </form>
        </UCard>

        <div v-if="!isLoaded" class="py-20 text-center">
          <ULoader class="mx-auto" /> </div>

        <div v-else-if="products.length === 0" class="py-20 text-center border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl">
          <UIcon name="i-lucide-package-open" class="w-12 h-12 mx-auto text-neutral-400 mb-4" />
          <h3 class="text-lg font-medium text-neutral-900 dark:text-white">Порожньо</h3>
          <p class="text-neutral-500">Додайте перший продукт вище</p>
        </div>

        <div v-else class="space-y-3">
          <TransitionGroup name="list">
            <ProductItem
              v-for="product in products"
              :key="product.id"
              :product="product"
              @delete="productStore.removeProduct"
            />
          </TransitionGroup>
          
          <footer class="pt-6 text-center border-t border-neutral-100 dark:border-neutral-800">
            <UBadge color="neutral" variant="outline">
              Всього: {{ products.length }}
            </UBadge>
          </footer>
        </div>

      </div>
    </UContainer>
  </div>
</template>

<style scoped>
/* Анімація списку */
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.list-leave-active {
  position: absolute; /* для плавного зміщення інших елементів */
  width: 100%;
}
</style>

