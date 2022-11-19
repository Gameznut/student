<template>
    <div>
        <Teleport to="body">
            <div class="modal px-2">
                <div class="bg-[#fdf9f9] max-w-[450px] w-full rounded-md overflow-hidden p-2">
                    <div>
                        <div class="flex justify-between ">
                            <h1 class="py-2">Edit Course</h1>
                        </div>
                        <div class="mb-4">
                            <input v-model="data.course" placeholder="Course code" type="text" />
                            <input v-model="data.location" placeholder="location" type="text" />
                            <input v-model="data.tutor" placeholder="Tutor" type="text" />
                        </div>

                    </div>
                    <button class="bg-[#B59DD1] float-left p-2 px-5 rounded-md" @click="upload(timeTable.day)">
                        <Save class="w-[25px] p-[1px]" />
                    </button>
                    <button class="bg-[#f3bcc2] float-right p-2 px-5 rounded-md" @click="close">Close</button>
                </div>
            </div>
        </Teleport>
    </div>
</template>
<script setup lang="ts">
import { TimeTable } from "@/stores/timetable";
import { ref } from "@vue/runtime-core";
import Save from "./icons/Save.vue";
const timeTable = TimeTable()
const data = ref({
    course: timeTable.data.course,
    location: timeTable.data.location,
    tutor: timeTable.data.tutor,
});

const upload = (day: string) => {
    const res = timeTable.timeTable.find(item => item.day.toLowerCase() == day.toLowerCase())
    if (data.value.course != '' && data.value.location != '') {

        res!.offering[timeTable.courseIndex].course = data.value.course
        res!.offering[timeTable.courseIndex].location = data.value.location
        res!.offering[timeTable.courseIndex].tutor = data.value.tutor
        localStorage.setItem("time-table", JSON.stringify(timeTable.timeTable)); //stringify object and store
        timeTable.openEditModal = false

    }
    else {
        alert(`Coures or Location can't be empty`)
        return false
    }

    if (data.value.course.includes('/')) alert('clashing course')


    data.value.course = ''
    data.value.location = ''
    data.value.tutor = ''


}
const close =
    () => {
        timeTable.openEditModal = false
        data.value.course = ''
        data.value.location = ''
        data.value.tutor = ''
    }

</script>
