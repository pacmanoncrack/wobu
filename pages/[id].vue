<script setup lang="ts">
    const route = useRoute()
    const data = await $fetch(`http://localhost/wobu/wp-json/wp/v2/pages/${route.params.id}?_embed`)

    const image = data._embedded && 'wp:featuredmedia' in data._embedded
        ? data._embedded['wp:featuredmedia'][0].source_url
        : null    
</script>

<template>
    <main class="min-h-screen flex flex-col lg:flex-row-reverse w-full relative">
        <section class="sticky top-[-25vh] w-full shrink-0 h-[50vh] lg:w-1/2 lg:h-screen lg:top-0 z-10">
            <img v-if="image" 
                 :src="image" alt="bg"
                 class="w-full h-full object-cover object-center">
        </section>

        <section class="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 relative lg:overflow-x-hidden lg:max-h-full ">
            <h1 v-text="data.title.rendered"
                class="text-2xl font-semibold relative"></h1>
            <div v-html="data.content.rendered" 
                 class="mt-6">
            </div>
        </section>
    </main>
</template>