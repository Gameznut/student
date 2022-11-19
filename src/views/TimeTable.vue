<template>
    <div>
        <div v-for="(item, index) in timeTable.timeTable" :key="index">
            <Tile :day="item.day" :offering='item.offering' />
        </div>
        <UploadModal v-if="timeTable.openOfferingModal" />
        <EditModal v-else-if="timeTable.openEditModal" />
    </div>
</template>

<script setup lang="ts">
import  EditModal from "@/components/EditModal.vue";
import { TimeTable } from "@/stores/timetable";
import Tile from "../components/Tile.vue";
import UploadModal from "../components/UploadModal.vue";
const timeTable = TimeTable()


</script>

<style scoped>

</style>
