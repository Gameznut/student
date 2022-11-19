<template>
    <div class="">
        <div class="flex justify-between items-center p-[20px] bg-[#F3ACB4] tile z-[10] sticky top-[62px]">
            <h1 class="font-[700]">{{ day }}</h1>
            <div class="flex justify-between">
                <button v-show="timeTable.editMode" @click="open(day)" class="more">
                    <Add class="w-[20px] p-1" />
                </button>
                <DropDown @click="dropDown = !dropDown" :class="dropDown ? 'icon' : ''"
                    class="p-[10px] duration-500 cursor-pointer" />
            </div>

        </div>


        <!-- List of courses -->
        <transition name="slide" mode="out-in">
            <div v-show="dropDown">
                <div class="" :class="``">
                    <div v-for="(item, index) in props.offering" :key="index">
                        <div class="border border-white bg-[#C794B0] p-[15px]">
                            <div>
                                <div class="flex justify-between items-start">
                                    <h1 class="font-[700] uppercase">{{ item.course }} </h1>
                                    <button @click="info(item)"
                                        class=" rounded-full duration-500 scale-[.8] hover:scale-[1] bg-black px-[16px] py-[10px] flex justify-center items-center cursor-pointer">
                                        <MoreIcon class="w-[8px] fill-white" />
                                    </button>
                                </div>
                                <p class="uppercase">{{ item.location }}</p>
                            </div>
                            <div class=" flex gap-1 items-end">

                                <div @click="remove(index, props.day)" v-show="timeTable.editMode"
                                    class="rounded-full  scale-[.8] hover:scale-[1] bg-black p-3 py-[10px] flex justify-center items-center cursor-pointer duration-300">
                                    <button>
                                        <TrashIcon class="w-[18px]  fill-white" />
                                    </button>
                                </div>
                                <div @click="edit(index, props.day)" v-show="timeTable.editMode"
                                    class="rounded-full  scale-[.8] hover:scale-[1] bg-black p-3 py-[12px] flex justify-center items-center cursor-pointer duration-300">
                                    <button>
                                        <Pen class="w-[18px]  fill-white" />
                                    </button>
                                </div>
                                <small class="text-right w-full inline-block font-[700]">{{ dateFormater(8 + index
                                        + `:00`)
                                }}</small>
                            </div>

                        </div>

                        <hr>
                    </div>
                </div>
            </div>

        </transition>

        <!-- Course Details -->
        <div v-if="openModal" class="modal px-2">
            <div class="bg-[#fdf9f9] max-w-[450px] w-full rounded-md overflow-hidden p-2">
                <p>Course Code : <span class="font-[700]">{{ timeTable.details.course }}</span></p>
                <p>Tutor : <span class="font-[700]">{{ timeTable.details.tutor }}</span></p>
                <button class="bg-[#F3ACB4] float-right p-2 rounded-md" @click="openModal = !openModal">Close</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { TimeTable } from "@/stores/timetable";
import { ref } from "@vue/runtime-core";
import DropDown from "./icons/DropDown.vue";
import TrashIcon from "./icons/TrashIcon.vue";
import Pen from "./icons/Pen.vue";
import MoreIcon from "./icons/MoreIcon.vue";
import Add from "./icons/Add.vue";
const dropDown = ref(false)
const openModal = ref(false)
const timeTable = TimeTable()
const props = defineProps({
    day: {
        type: String,
        required: true
    },
    offering: {
        type: Array<{ course: string, location: string, tutor: string }>,
        required: true
    }
})

const dateFormater = (time: string) => {
    const [hourString, minute] = time.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute + (hour < 12 ? "AM" : "PM");
    // if (timeTable)
    
}

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
.modal {
    position: fixed;
    z-index: 999;
    inset: 0;
    display: grid;
    place-items: center;
    background-color: #2a164152;
}

.slide-enter-from,
.slide-leave-to {
    opacity: 0;
    transform: translateY(-10%);
}

.slide-enter-active,
.slide-leave-active {
    transition: 0.4s ease-in-out;
}

.more {
    background: #C794B0;
    padding: 5px 10px;
    border-radius: 10px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
}

.icon {
    --tw-rotate: 180deg;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

h1 {
    font-size: clamp(1.5rem, 1.6rem, 2rem);
}
</style>
