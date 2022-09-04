<template>
  <div class="flex flex-col items-center justify-start min-h-screen bg-zinc-800">
    <main role="main" class="flex flex-col bg-zinc-700 p-4 m-3 space-y-10 shadow-2xl rounded-3xl 
    md:flex-row md:space-x-10 md:space-y-0">
      <section class="flex flex-col items-center justify-center space-y-3">
        <div class="relative">
          <img src="@/assets/images/banner-2.jpg" alt="" class="h-96 object-cover rounded-xl duration-200 md:h-96">
          <h2 class="absolute top-1/2 left-0 text-5xl bg-white p-6 font-light rounded-r-full">
            G<span class="text-zinc-800 font-bold mx-2">∞</span>d Tingz
          </h2>
        </div>
      </section>

      <section class="flex flex-col items-center
      md:items-start">
        <h2 class="text-2xl mb-2 font-light text-white">On Sale Now</h2>

        <!--Card Container-->
        <div class="flex flex-col p-8 space-y-10 bg-zinc-50 rounded-2xl shadow-2xl 
          md:flex-row md:space-y-0 md:space-x-10 font-mono">

          <!--Image-->
          <img src="@/assets/images/black-cape.png" alt="" class="object-fit mx-auto duration-200 hover:scale-105 h-96
          md:h-60">

          <!--Content-->
          <div class="flex flex-col space-y-6">

            <!--Label-->
            <div class="flex-flex-col mb-4 space-y-3 text-center 
              md:text-left">
              <div class="">
                <div class="inline-block px-3 py-1 text-sm bg-red-400 
                text-white rounded-full font-sans">
                  40% Off !!!
                </div>
              </div>

              <!--Description-->
              <div class="max-w-full text-3xl font-medium">
                Black Cape
              </div>

              <!--Others-->
              <div class="flex flex-col mb-4 space-y-3 text-center 
              md:text-left">
                <p class="text-xl font-light line-through">$1299</p>
                <p class="text-5xl font-bold">$799</p>

                <!--Button Group-->
                <div class="group" @click="addToCart('Black Cape',0)">
                  <button class="w-full bg-blue-700 transition-all duration-150
                    text-white border-b-4 border-b-blue-700 rounded-lg
                    group-hover:border-t-4 group-hover:border-b-0 group-hover:bg-blue-700
                    group-hover:border-t-blue-700 group-hover:shadow-lg">
                    <div class="px-4 py-2 
                     font-sans rounded-lg duration-150">
                      Add to cart
                    </div>
                  </button>
                </div>

                <!--Stock-->
                <div class="flex items-center space-x-3 group">
                  <div class="w-3 h-3 bg-green-400 rounded-full group-hover:animate-ping"></div>
                  <div class="text-sm">50+ pcs in stock</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <footer class="text-gray-400 text-center w-full font-light mt-8">
      &copy; 2022 JeromeJoh. All rights reserved.
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  props: ['inventory', 'addToCart']
}
</script>
