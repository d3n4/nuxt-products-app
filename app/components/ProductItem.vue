<script setup lang="ts">
import type { Product } from '~/composables/useProducts'

const { product } = defineProps<{
  product: Product
}>();

const emit = defineEmits<{
  delete: [id: string]
}>();

const formattedDate = computed(() => {
  return new Intl.DateTimeFormat('uk-UA', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(product.createdAt));
});

const handleDelete = () => emit('delete', product.id)
</script>

<template>
  <UCard>
    <div class="flex items-center justify-between gap-4">
      <div class="flex-1 min-w-0">
        <h3 class="text-base font-semibold truncate text-neutral-900 dark:text-neutral-100">
          {{ product.name }}
        </h3>
        
        <time :datetime="product.createdAt" class="text-xs text-neutral-500 mt-1 block">
          {{ formattedDate }}
        </time>
      </div>
      
      <UButton
        color="error"
        variant="ghost"
        icon="i-lucide-trash-2"
        aria-label="Видалити продукт"
        @click="handleDelete"
      />
    </div>
  </UCard>
</template>
