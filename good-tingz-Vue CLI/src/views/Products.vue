<template>
  <div class="bg-zinc-800 text-center min-h-screen">
    <div class="flex flex-col items-center justify-center">
      <h1 class="text-5xl text-white font-mono mb-4">All Products</h1>

      <!--Card Container-->
      <div v-for="(product, index) in inventory" :key="product.id" class="flex flex-col p-6 m-3 spacey-10 bg-white rounded-2xl shadow-2xl 
    md:flex-row md:space-y-0 md:space-x-10 md:p-16 md:w-4/5">
        <!--Image-->
        <img :src="require('@/assets/images/' + product.name.toLowerCase().replace(/\W/g, '-') + '.png')" 
        alt="" class="object-cover mx-auto duration-200 
        md:hover:scale-150 h-80 md:h-60 my-auto hover:scale-105">
        <!--Content-->
        <div class="flex flex-col space-y-6 w-80">
          <!--Label-->
          <div class="flex-flex-col mb-4 space-y-3 text-center 
        md:text-left">
            <div>
              <div class="inline-block px-3 py-1 text-sm bg-black text-white rounded-full">
                Free Shipping
              </div>
            </div>

            <!--Description-->
            <div class="max-w-full text-3xl font-medium">
              {{ product.name }}
            </div>

            <!--Price&Type-->
            <div class="flex-flex-col mb-4 space-y-3 text-center 
          md:text-left">
              <p class="text-5xl font-bold">${{ product.price }}</p>
              <p class="text-sm font-light text-gray-400">
                Category: {{ product.type }}
              </p>
              <div class="">
                <label for="qty" class="text-gray-600 font-bold mr-2">Quantity:</label>
                <input type="number" placeholder="Quantity U Want" id="qty" v-model.number="inventory[index].quantity"
                  class="outline-none py-2
              focus:border-b-2 focus:border-b-blue-700 text-center md:text-left">
              </div>



              <!--Button Group-->
              <div class="group">
                <button class="w-full bg-blue-700 transition-all duration-150
              text-white border-b-8 border-b-blue-700 rounded-lg
              group-hover:border-t-8 group-hover:border-b-0 group-hover:bg-blue-700
              group-hover:border-t-blue-700 group-hover:shadow-lg">
                  <div class="px-8 py-4 bg-blue-500 rounded-lg duration-150 font-bold"
                    @click="addToCart(product.name, index)">
                    Add to cart
                  </div>
                </button>
              </div>

              <!--Stock-->
              <div class="flex items-center space-x-3 group">
                <div class="w-3 h-3 bg-green-400 rounded-full group-hover:animate-ping"></div>
                <div class="text-sm">{{ product.stock }} pcs in stock</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  props: ['inventory', 'addToCart']
}
</script>

