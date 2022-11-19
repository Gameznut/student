<script setup lang="ts">
import { watch, onMounted, watchEffect, ref } from '@vue/runtime-core';
import Navbar from './components/Navbar.vue';
import { TimeTable } from './stores/timetable';

const date = new Date();
const timeTable = TimeTable()
const present = ref(date.toLocaleDateString("en-us", { weekday: "long" }));
let notify = 'false'

watch(timeTable, (update) => {
  const body = document.querySelector('body')
  if (update.openOfferingModal || update.openEditModal) body!.style.overflow = 'hidden'
  else body!.style.overflow = 'auto'
})
// onMounted(() => {
//   Notification.requestPermission().then((result) => {
//     // alert(result)
//   }).catch((err) => {
//     console.log(err);

//   });
//   localStorage.setItem("notify", 'false')
//   if (present.value === timeTable.present) {
//     let notifyDb = localStorage.getItem("notify")

//     if (notify == notifyDb) {
//       new Notification("Time Table", {
//         body: JSON.stringify(timeTable.today),
//       });
//       localStorage.setItem("notify", 'true')
//     }
//   }
// })
// watchEffect(() => {


// })
</script>

<template>
  <Navbar />
  <RouterView />

</template>

<style>
body input {
  margin-bottom: 10px;
  padding: 10px 10px;
  width: 100%;
  outline: none;
  background-color: #d2bceb;
  display: block;
  border-radius: 10px;
}

body input:last-child {
  margin-bottom: 0px;
}

body input::placeholder {
  color: #1f071d;
}

body input:focus {
  border-bottom: #C794B0 2px solid;
}

body {
  background-color: #4d4358;
}

header {
  display: flex;
  justify-content: center;
  padding: 0 10px;
  align-items: center;
}

header h1 {
  font-size: clamp(1.5rem, 1.6rem, 2rem);
  font-weight: 900;
  flex-grow: 1;
}

header button,
body .more {
  background: #C794B0;
  padding: 10px 20px;
  border-radius: 10px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.modal {
  position: fixed;
  z-index: 999;
  inset: 0;
  display: grid;
  place-items: center;
  background-color: #b59dd167;
}
</style>
