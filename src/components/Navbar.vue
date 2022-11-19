<template>
    <header ref="nav" class="text-center py-3 bg-[#B59DD1] z-[100] sticky top-0">
        <BarIcon @click="navbar"
            class="w-[30px] cursor-pointer hover:scale-100 scale-75 duration-500 hover:fill-white" />
        <h1 class="text-[20px]">STUDENT PLANNER</h1>
        <button v-if="!timetable.editMode" @click="timetable.editMode = true">
            <Pen class=" h-[20px]" />
        </button>
        <button v-else @click="timetable.editMode = false">
            <Done class="h-[20px]" />
        </button>
    </header>
    <teleport to='body'>
        <transition name="slide" mode="out-in">
            <div @click="navbar" v-show="navopen"
                class="fixed text-white bg-[#000000cc] z-[1000] inset-0 grid place-items-center navmodal">
                <div class=" max-w-[300px] w-full p-4 flex gap-[3px] flex-col content-center items-center">
                    <router-link class="px-4 hover:underline text-center uppercase font-[600] text-[30px]"
                        :to="{ name: 'home' }">Dashboard
                    </router-link>
                    <router-link class="px-4 hover:underline text-center uppercase font-[600] text-[30px]"
                        :to="{ name: 'timetable' }">Time
                        Table
                    </router-link>
                    <router-link class="px-4 hover:underline text-center uppercase font-[600] text-[30px]"
                        :to="{ name: 'assignment' }">
                        Assignment</router-link>
                </div>

            </div>
        </transition>
    </teleport>

</template>
<script setup lang="ts">
import Done from '@/components/icons/Done.vue'
import Pen from '@/components/icons/Pen.vue'
import BarIcon from '@/components/icons/BarIcon.vue';
import { TimeTable } from '../stores/timetable'
import { ref, watch } from '@vue/runtime-core';
const timetable = TimeTable()
const navopen = ref(false)
const navbar = () => {
    navopen.value = !navopen.value
}
watch(navopen, (update) => {
    const body = document.querySelector('body')
    if (update) body!.style.overflow = 'hidden'
    else body!.style.overflow = 'auto'
})
</script>

<style scoped>
.slide-enter-from,
.slide-leave-to {
    opacity: 0;

    transform: translateY(-10%);
}

.slide-enter-active,
.slide-leave-active {
    transition: 0.4s ease-in-out;
}
</style>
