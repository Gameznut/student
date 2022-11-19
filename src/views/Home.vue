<template>
    <div class=" text-white">
        <p class="text-center text-[30px]  sticky top-[64px] bg-[black]">{{ present }}</p>

        <div v-for="item, index in today" :key="index">
            <div class="border border-white bg-[#C794B0] p-[15px]">
                <div>
                    <div class="flex justify-between items-start">
                        <h1 class=" uppercase">Course: {{ item.course }} </h1>
                        <!-- <button
                            class=" rounded-full duration-500 scale-[.8] hover:scale-[1] bg-black px-[16px] py-[10px] flex justify-center items-center cursor-pointer">
                            <MoreIcon class="w-[8px] fill-white" />
                        </button> -->
                    </div>
                    <p class="uppercase">Location: {{ item.location }}</p>
                    <p class="uppercase">Tutor: {{ item.tutor != "" ? item.tutor : "Don't know" }}</p>
                </div>
                <div class=" flex gap-1 items-end">
                    <small class="text-right w-full inline-block font-[700]">{{ dateFormater(8 + index
                            + `:00`)
                    }}</small>
                </div>

            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { TimeTable } from '@/stores/timetable';
import TrashIcon from "@/components/icons/TrashIcon.vue";
import Pen from "@/components/icons/Pen.vue";
import MoreIcon from "@/components/icons/MoreIcon.vue";
import { ref } from '@vue/runtime-core';
const dateFormater = (time: string) => {
    const [hourString, minute] = time.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute + (hour < 12 ? "AM" : "PM");
}
const timeTable = TimeTable()
const present = timeTable.present
const today = timeTable.today
const openModal = ref(false)
const open = (day: string) => {
    timeTable.openOfferingModal = true
    timeTable.day = day
}

const edit = (index: number, day: string) => {
    const data = timeTable.timeTable.find(item => item.day.toLowerCase() === day.toLowerCase())
    timeTable.courseIndex = index
    timeTable.day = day
    timeTable.data.course = data!.offering[index].course
    timeTable.data.location = data!.offering[index].location
    timeTable.data.tutor = data!.offering[index].tutor
    timeTable.openEditModal = true

}

// remove course
const remove = (index: number, day: string) => {
    const data = timeTable.timeTable.find(item => item.day.toLowerCase() === day.toLowerCase())
    data?.offering.splice(index, 1)
    localStorage.setItem("time-table", JSON.stringify(timeTable.timeTable));
}


// <!--Course Details-- >
const info = (info: {
    course: string;
    location: string;
    tutor: string
}) => {
    openModal.value = true
    timeTable.details.course = info.course
    timeTable.details.tutor = info.tutor
}

</script>

<style scoped>

</style>
