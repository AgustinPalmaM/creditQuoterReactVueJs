<script setup>

  import { ref, computed } from 'vue';
  import Header from "./components/Header.vue";

  const quantity = ref(10000);

  const MIN = 0;
  const MAX = 20000;
  const STEP = 100;

  const formatMoney = computed(() => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })

    return formatter.format(quantity.value)
  });

</script>

<template>
  <div class="my-20 max-w-lg mx-auto bg-white shadow p-10">
    <Header />
    <div class="my-5">
      <input 
        v-model.number="quantity"
        class="w-full bg-gray-200 accent-lime-500 hover:accent-lime-600"
        :min="MIN"
        :max="MAX"
        :step="STEP"
        type="range" 
        name="" 
        id="">
    </div>
    <p class="text-center my-10 text-5xl font-extrabold text-indigo-600">{{ formatMoney }}</p>
  </div>
</template>

<style></style>
