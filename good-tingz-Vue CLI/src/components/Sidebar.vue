<template>
  <aside class="fixed right-0 top-0 bottom-0 w-96 bg-gray-200 
  rounded-l-xl text-xl font-mono overflow-hidden">
    <!--Sidebar Header-->
    <div class="flex items-center justify-between p-4">
      <h2 class="text-3xl">Your Cart ({{ sum(Object.values(cart)) }})</h2>
      <div class="hover:scale-110" @click="toggle">
        <img src="@/assets/images/delete.svg" alt="" class="h-8">
      </div>
    </div>
    <!--Blank Cart-->
    <h3 v-if="!Object.entries(cart).length" class="text-sm italic text-center my-4 text-gray-400">
      No items in cart now
    </h3>
    <!--Cart Item-->
    <div class="flex  mt-8" v-for="(i, product) in cart">
      <button class="flex items-center justify-center h-8 w-8 
      hover:bg-red-300 rounded-full mx-4 flex-shrink-0" @click="deleteItem(product)">
        <img src="@/assets/images/dash.svg" alt="" class="h-4">
      </button>
      <p>{{ product }} ~~~ <span class="font-bold">{{ i }} pcs</span></p>
    </div>
    <!--Total&Checkout-->
    <div class="flex items-center justify-between p-4 mt-4">
      <h2 class="text-2xl">Total:<span class="text-3xl font-bold text-red-400">${{ totalBill() }}</span></h2>
      <button class="shadow-2xl px-4 py-2 rounded-full bg-zinc-800 text-white hover:bg-zinc-600">
        Checkout
      </button>
    </div>
  </aside>
</template>

<script>
export default {
  props: ['toggle', 'cart', 'inventory'],
  methods: {
    deleteItem(name) {
      delete this.cart[name]
    },
    sum(arr) {
      return eval(arr.join('+')) ? eval(arr.join('+')) : 0
    },
    getPrice(name) {
      const product = this.inventory.find(p => {
        return p.name === name
      })
      return product.price
    },
    totalBill() {
      const total = Object.entries(this.cart).reduce((acc, curr, index) => {
        return acc + (curr[1] * this.getPrice(curr[0]))
      }, 0)
      return total
    }
  }
}
</script>
