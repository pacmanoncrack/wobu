
<script setup lang="ts">
  const open = useState('open', () => false)

  /* useAsyncData() and $fetch() are auto-imported */
  // const { data, refresh, pending } = await useFetch('/api/hello')

//   const { data } = await useFetch('http://localhost/wobu/wp-json/custom/menu/2')
//   console.info('response', data);

//   fetch('http://localhost/wobu/wp-json/custom/menu/2')
//     .then(response => response.json())
//     .then(data => {
//       console.info('data', data)
//     })

    const items = await $fetch('http://localhost/wobu/wp-json/custom/menu/2')

    const toggle = () => {
      open.value = !open.value
    }

    const close = () => {
      open.value = false
    }
</script>

<template>
  <div class="contents">
    <div class="w-screen z-10 fixed bg-green/20 transition-all ease-out"
    :class="{
      'visible opacity-100 backdrop-blur-sm': open,
      'invisible opacity-0 backdrop-blur-none': !open
    }" @click="close()"></div>

    <nav class="w-screen z-20 fixed inset-0 w-full sm:left-auto sm:w-1/2 lg:w-80 h-screen overflow-hidden">
      <div class="z-10 fixed right-6 top-6 lg:right-8 lg:top-8 box w-8 h-8 lg:w-10 lg:h-10" @click="toggle()">
        <div class="aspect-square -inset-24 lg:-inset-40 absolute radial-gradient rounded-full transition-opacity ease-out"
            :class="{ 
              'opacity-0 scale-0': open,
              'opacity-100 scale-100': !open,
            }"></div>

        <div class="btn w-8 lg:w-10 group"
            :class="{ 'active': open, 'not-active': !open }">
          <span></span>
          <span></span>
          <span></span>

          <div class="aspect-square inset-x-0 -top-0.5 absolute scale-75 transition-all duration-75 ease-out bg-white/10 opacity-0 group-hover:opacity-100 group-hover:scale-[1.75] rounded-full"></div>
        </div>
      </div>

      <div class="flex flex-col justify-between h-full bg-green-400 px-8 py-16 lg:pt-28 transition-transform duration-150 ease-out"
          :class="{ 'translate-x-full': !open }">

        <ul class="flex lg:hidden flex-col h-full" @click.stop>
          <li v-for="(item, index) in items"
              :key="item.ID" class="h-12">

              <NuxtLink :to="`/${item.object_id}`" 
                        class="h-full w-full flex justify-center lg:justify-start items-center"
                        @click="close()">
                <span v-text="item.title"
                      class="block text-white font-semibold transition-all ease-out"
                      :class="{ 
                        'translate-y-0 opacity-100': open, 
                        'translate-y-[50vh] opacity-0': !open 
                      }"
                      :style="`transition-duration: ${(index + 1) * 200}ms`"></span>
              </NuxtLink>
          </li>
        </ul>

        <ul class="hidden lg:flex flex-col bg-green-400 h-full"
            :class="{ 'translate-x-full': !open }"
            @click.stop>

          <li v-for="(item, index) in items"
              :key="item.ID" class="h-12">

              <NuxtLink :to="`/${item.object_id}`" 
                        class="h-full w-full flex justify-center lg:justify-start items-center"
                        @click="close()">
                <span v-text="item.title"
                      class="block text-white font-semibold transition-all ease-out"
                      :class="{ 
                        'translate-x-0 opacity-100': open, 
                        'translate-x-full opacity-0': !open 
                      }"
                      :style="`transition-delay: ${index * 100}ms; transition-duration: ${(index + 1) * 200}ms`"></span>
              </NuxtLink>

              <!-- <a v-text="item.title" 
                  :href="item.guid"
                  class="text-white font-medium text-2xl"
                  @click.prevent="console.info('helo woröd')"
              ></a> -->
          </li>
        </ul>


        <div class="flex flex-col gap-2">
          <a class="text-sm text-white" href="mailto:wobu@gmail.com">
            wobu@gmail.com
          </a>
          <span class="text-sm text-white">
            Sonstige Info
          </span>
        </div>
      </div>
    </nav>
  </div>

</template>
