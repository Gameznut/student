import { createApp } from "vue";
import { createPinia } from "pinia";
import Vue3DraggableResizable from "vue3-draggable-resizable";
//default styles
import "vue3-draggable-resizable/dist/Vue3DraggableResizable.css";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Vue3DraggableResizable);
// app.use(GridItem);

app.mount("#app");
