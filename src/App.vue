<script setup>

  import { ref, computed, watch } from 'vue';
  import Header from "./components/Header.vue";
  import Button from "./components/Button.vue";
  import { calculateTotalPayment } from "./helpers"

  const quantity = ref(10000);
  const months = ref(6);
  const totalPayment = ref(0)

  const MIN = 0;
  const MAX = 20000;
  const STEP = 100;

  const formatMoney = (money) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })

    return formatter.format(money)
  };

  watch([quantity, months], () => {
    totalPayment.value = calculateTotalPayment(quantity.value, months.value)
  })

  const monthlyPayment = computed(() => {
    return formatMoney(totalPayment.value / months.value)
  })

  const handleChangeDecrement = () => {
    if (quantity.value <= MIN ) {
      alert(`Quantity can't be less than ${MIN}` )
      return
    }
    return quantity.value -= STEP;
    
  }

  const handleChangeIncrement = () => {
    if (quantity.value >= MAX) {
      alert(`Quantity can't be more than ${MAX}`)
      return
    }

    return quantity.value += STEP;
    
  }

</script>

<template>
  <div class="my-20 max-w-lg mx-auto bg-white shadow p-10">
    <Header />
    <div class="flex justify-between mt-10">
      <Button
        :operator="'-'"
        @fn="handleChangeDecrement"
      />
      <Button
        :operator="'+'" 
        @fn="handleChangeIncrement"
      />
    </div>
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
    <p class="text-center my-10 text-5xl font-extrabold text-indigo-600">{{ formatMoney(quantity) }}</p>
    <h2 class="text-2xl font-extrabold text-gray-500 text-center">
      Choose your <span class="text-indigo-600">Payment Term</span>
    </h2>

    <select
      :value="months"
      v-model.number="months"
      class="mt-5 w-full p-2 bg-white border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-500" 
      name="" 
      id="">
      <option value="6">6 Months</option>
      <option value="12">12 Months</option>
      <option value="24">24 Months</option>
    </select>

    <div v-if="totalPayment>0" class="my-5 space-y-3 bg-gray-100 p-5">
      <h2 class="text-2xl font-extrabold text-gray-500 text-center">
        Summary <span class="text-indigo-600">Credit simulation</span>
      </h2>

      <p class="text-xl text-gray-500 text-center font-bold">{{months}} Months</p>
      <p class="text-xl text-gray-500 text-center font-bold">Total to pay: {{ formatMoney(totalPayment) }}</p>
      <p class="text-xl text-gray-500 text-center font-bold">Monthly payments: {{ monthlyPayment }}</p>
    </div>
    <h2 v-else class="mt-5 text-xl font-bold text-gray-500 text-center">Choose an amount and a payment terms to start</h2>
  </div>

</template>

<style></style>
