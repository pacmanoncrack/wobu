<script setup lang="ts">
    const route = useRoute()
    const data = await $fetch(`http://localhost/wobu/wp-json/wp/v2/pages/${route.params.id}?_embed`)

    const scrolled = useState('scrolled', () => false)
    const isStuck = ref(false)
    const intersect = ref(null)

    if (process.browser) {
        window.addEventListener('wheel', () => {
            scrolled.value = window.scrollY > 0
        })
    }

    onMounted(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                isStuck.value = !entry.isIntersecting;
            },
            { threshold: [1] }
        );

        if (intersect.value) {
            observer.observe(intersect.value);
        }

        onUnmounted(() => {
            observer.disconnect();
        });
    })

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

        <section class="w-full lg:w-1/2 pt-12 pb-24 lg:pt-0 relative lg:overflow-x-hidden lg:max-h-full scrollable">
            <div class="sticky top-[25vh] lg:top-0 lg:h-auto w-full py-4 px-4 sm:px-6 lg:px-8">
                <span ref="intersect" class="absolute block top-[-25.5vh]"></span>

                <div class="z-10 absolute inset-y-0 inset-x-0 lg:-inset-x-8 bg-green-200 transition-all duration-150 ease-out"
                     :class="{ 
                        'scale-100 opacity-100': isStuck, 
                        'scale-0 opacity-0': !isStuck
                        }"
                     ></div>

                <h1 v-text="data.title.rendered"
                    class="z-20 text-2xl font-semibold relative"
                    :class="{ 
                        'text-white': isStuck
                    }"></h1>
            </div>

            <div v-html="data.content.rendered" 
                 class="mt-6 px-4 sm:px-6 lg:px-8">

                 
            </div>
        </section>
    </main>
</template>