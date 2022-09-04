<template>
  <div class="flex flex-col items-center justify-start bg-zinc-800">
    <header role="banner" class="flex items-center justify-center mb-16
    bg-white rounded-b-xl">
      <nav class="flex space-x-4">
        <router-link to="/" title="Home" class="p-6 py-4 hover:bg-zinc-300 duration-200 rounded-b-xl">
          <img src="@/assets/images/home.svg" alt="" class="h-8">
        </router-link>
        <router-link to="/products" title="Products" class="px-6 py-4 hover:bg-zinc-300 duration-200 rounded-b-xl">
          <img src="@/assets/images/product.svg" alt="" class="h-10 relative -top-1">
        </router-link>
        <router-link to="/orders" title="Orders" class="px-6 py-4 hover:bg-zinc-300 duration-200 rounded-b-xl">
          <img src="@/assets/images/order.svg" alt="" class="h-8">
        </router-link>
        <a class="px-6 py-4 hover:bg-zinc-300 duration-200 rounded-b-xl" @click="toggleSidebar" title="Cart">
          <img src="@/assets/images/cart.svg" alt="" class="h-8">
        </a>
      </nav>
    </header>
  </div>
  <router-view :inventory="inventory" :addToCart="addToCart"/>

  <Sidebar   
  v-if="isVisible" 
  :toggle="toggleSidebar" 
  :cart="cart" 
  :inventory="inventory" />
  
</template>

<style>
</style>

<script>
import goods from '@/goods-on-sale.json'
import Sidebar from '@/components/Sidebar.vue'
export default {
  components: {
    Sidebar
  },
  data() {
    return {
      isVisible: false,
      inventory: goods,
      cart: {}
    }
  },
  methods: {
    toggleSidebar() {
      this.isVisible = !this.isVisible
    },
    addToCart(name, index) {
      if (!this.cart[name]) this.cart[name] = 0
      this.cart[name] += this.inventory[index].quantity
      this.inventory[index].quantity = 1
    }
  }
}
</script>
