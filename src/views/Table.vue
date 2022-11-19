<template>
    <div class="relative ">
        <!-- <div class="bg-[red] ">
      up div
    </div> -->
        <!-- <div class="layoutJSON">
      Displayed as <code>[x, y, w, h]</code>:
      <div class="columns">
        <div class="layoutItem" v-for="item in layout" :key="item.i">
          <b>{{item.i}}</b>: [{{item.x}}, {{item.y}}, {{item.w}}, {{item.h}}]
        </div>
      </div>
    </div> -->
        <div
            class="w-full fixed bottom-[100px] left-0 right-0 mx-auto max-w-[500px] my-[3px] justify-center items-center flex gap-[30px]">
            <button class="py-2 px-[20px] rounded-lg bg-[pink] hover:bg-[#f3acb8] hover:shadow-sm hover:shadow-black"
                @click="open = !open">Add an item dynamically</button>
            <!-- <input type="checkbox" v-model="draggable" /> Draggable -->
            <!-- <input type="checkbox" v-model="resizable" /> Resizable -->
        </div>
        <div class="">
            <div class="fixed left-[170px] right-0 top-0 bottom-0 bg-slate-400 w-full flex flex-row  h-[120px] z-50">
                <div class="relative ">
                    <grid-layout :layout.sync="time" :col-num="colNum" :row-height="30" :is-draggable="false"
                        :margin="[20,20]" :is-resizable="false" :vertical-compact="true" :use-css-transforms="false">
                        <grid-item :maxH="40" v-for="item in time" :static="item.static" :x="item.x" :y="item.y"
                            :w="item.w" :h="2" :i="item.i" :key="item.i">
                            <span class="flex items-center justify-center h-full">{{item.i}}</span>
                        </grid-item>
                    </grid-layout>
                </div>
            </div>
            <div class="fixed left-0 right-0 top-0 bottom-0 bg-slate-400 w-[170px] z-50">
                <div class="relative ">
                    <grid-layout class="" :layout.sync="days" :col-num="colNum" :row-height="30" :is-draggable="false"
                        :margin="[10,20]" :is-resizable="false" :vertical-compact="false" :use-css-transforms="false">
                        <grid-item :maxH="40" v-for="item in days" :static="item.static" :x="item.x" :y="item.y"
                            :w="item.w" :h="2" :i="item.i" :key="item.i">
                            <span class="flex items-center justify-center h-full">{{item.i}}</span>
                        </grid-item>
                    </grid-layout>
                </div>
            </div>
            <div class="absolute right-0 top-[120px] left-[170px]">
                <div class="relative ">
                    <grid-layout :layout.sync="layout" :col-num="colNum" :row-height="30" :margin="[20,10]"
                        :is-draggable="true" :is-resizable="true" :vertical-compact="true" :use-css-transforms="false">
                        <grid-item :maxH="40" v-for="item in layout" :static="item.static" :x="item.x" :y="item.y"
                            :w="item.w" :h="2" :i="item.i" :key="item.i">
                            <span class="flex items-center justify-center h-full">{{item.i.courseCode}}</span>
                            <span class="remove" @click="removeItem(item.i)">x</span>
                        </grid-item>
                    </grid-layout>
                </div>
            </div>
        </div>

        <div v-if="open" class=" fixed bg-[#000000e5] grid place-items-center z-[3000] top-0 bottom-0 left-0 right-0">
            <div class="bg-[white] rounded-t-xl max-w-[600px] relative h-[600px] mx-auto w-full">
                <div class=" z-[5000] ">
                    <button
                        class="bg-[#df5c5c] rounded-br-xl rounded-tl-xl hover:shadow-[#302d2d] shadow-[#302d2d] shadow-md hover:shadow-inner px-[40px] py-3 text-white text-[30px]"
                        @click="open= !open">Close</button>
                </div>
                <div class="px-3 mt-[40px]">
                    <div class="flex flex-col ">
                        <label for="">Course Code</label>
                        <input class="bg-[grey] w-full rounded-[5px] py-3 px-3" type="text" v-model="courseCode">
                    </div>


                    <button
                        class="w-full bg-[green] rounded-[10px] py-3 mt-[30px] text-[30px] hover:shadow-[#302d2d] shadow-[#302d2d] shadow-md hover:shadow-inner"
                        @click="addItem()">add</button>
                </div>

            </div>
        </div>


    </div>
</template>

<script setup lang="ts">
// tsignore
import { onMounted, onUpdated, ref } from "@vue/runtime-dom";
import { GridLayout, GridItem } from "vue3-grid-layout"

const open = ref(false)
const courseCode = ref()
const layout = ref()
const time = ref()
const days = ref()
const draggable = ref()
draggable.value = false
const resizable = ref()
resizable.value = false
const colNum = 22
const index = ref()
index.value = 0
layout.value = [
    { x: 0, y: 0, w: 2, h: 2, i: { courseCode: 'EIE411' } },
    { x: 2, y: 0, w: 2, h: 2, i: { courseCode: 'EIE412' } },
    { x: 4, y: 0, w: 2, h: 2, i: { courseCode: 'EIE413' } },
    { x: 6, y: 0, w: 2, h: 2, i: { courseCode: 'EIE414' } },
    { x: 8, y: 0, w: 2, h: 2, i: { courseCode: 'EIE415' } },
]

time.value = [
    { x: 0, y: 0, w: 2, h: 2, i: "8-9" },
    { x: 2, y: 0, w: 2, h: 2, i: "9-10" },
    { x: 4, y: 0, w: 2, h: 2, i: "10-11" },
    { x: 6, y: 0, w: 2, h: 2, i: "11-12" },
    { x: 8, y: 0, w: 2, h: 2, i: "12-1" },
    { x: 10, y: 0, w: 2, h: 2, i: "1-2" },
    { x: 12, y: 0, w: 2, h: 2, i: "2-3" },
    { x: 14, y: 0, w: 2, h: 2, i: "3-4" },
    { x: 16, y: 0, w: 2, h: 2, i: "4-5" },
    { x: 18, y: 0, w: 2, h: 2, i: "5-6" },
    { x: 20, y: 0, w: 2, h: 2, i: "6-7" },
]

days.value = [
    { x: 0, y: 0, w: 2, h: 2, i: "days/time" },
    { x: 0, y: 2, w: 2, h: 2, i: "Monday" },
    { x: 0, y: 4, w: 2, h: 2, i: "Tuesday" },
    { x: 0, y: 6, w: 2, h: 2, i: "Wednesday" },
    { x: 0, y: 8, w: 2, h: 2, i: "Thursday" },
    { x: 0, y: 10, w: 2, h: 2, i: "Friday" },
    // { x: 0, y: 12, w: 2, h: 2, i: "1-2" },
    // { x: 0, y: 14, w: 2, h: 2, i: "2-3" },
    // { x: 0, y: 16, w: 2, h: 2, i: "3-4" },
    // { x: 0, y: 18, w: 2, h: 2, i: "4-5" },
    // { x: 0, y: 20, w: 2, h: 2, i: "5-6" },
    // { x: 0, y: 22, w: 2, h: 2, i: "6-7" },
]

const addItem = () => {
    layout.value.push({
        x: (layout.value.length * 2) % (colNum || 24),
        y: layout.value.length + (colNum || 24), // puts it at the bottom
        w: 2,
        h: 2,
        i: { courseCode: courseCode.value },
    });
    open.value = !open.value
    // Increment the counter to ensure key is always unique.
    index.value++;
}
const removeItem = (id: any) => {
    const index = layout.value.map((item: { i: any; }) => item.i).indexOf(id);
    layout.value.splice(index, 1);
}

onMounted(() => {
    index.value = layout.value.length;
     (index.value);
})

onUpdated(() => {
    index.value = layout.value.length;

})
 ('yo');

</script>

<style scoped>
.layoutJSON {
    background: #ddd;
    border: 1px solid black;
    margin-top: 10px;
    padding: 10px;
}

.columns {
    -moz-columns: 120px;
    -webkit-columns: 120px;
    columns: 120px;
}


.remove {
    position: absolute;
    right: 10px;
    top: 0;
    cursor: pointer;
}

.vue-grid-layout {
    background: rgba(167, 78, 78, 0.466);
}

.vue-grid-item:not(.vue-grid-placeholder) {
    background: #ccc;
    border: 1px solid black;
}

.vue-grid-item .resizing {
    opacity: 0.2;
}

.vue-grid-item .static {
    background: #cce;
}

.vue-grid-item .text {
    font-size: 24px;
    text-align: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 100%;
    width: 100%;
}

.vue-grid-item .no-drag {
    height: 100%;
    width: 100%;
}

.vue-grid-item .minMax {
    font-size: 12px;
}

.vue-grid-item .add {
    cursor: pointer;
}

.vue-draggable-handle {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0;
    left: 0;
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>") no-repeat;
    background-position: bottom right;
    padding: 0 8px 8px 0;
    background-repeat: no-repeat;
    background-origin: content-box;
    box-sizing: border-box;
    cursor: pointer;
}
</style>
