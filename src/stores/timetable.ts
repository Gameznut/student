import { ref, computed } from "vue";
import { defineStore } from "pinia";

export interface TimeTable {
  day: "string";
  offering: { course: string; location: string; tutor: string }[];
}
export const TimeTable = defineStore("timetable", () => {
  const editMode = ref(false);
  const openOfferingModal = ref(false);
  const openEditModal = ref(false);
  const day = ref("");
  const courseIndex = ref(0);
  const details = ref({
    course: "",
    location: "",
    tutor: "",
  });
  const data = ref({
    course: "",
    location: "",
    tutor: "",
  });
  const timeTable = ref([
    {
      day: "Monday",
      offering: [] as { course: string; location: string; tutor: string }[],
    },
    {
      day: "Tuesday",
      offering: [] as { course: string; location: string; tutor: string }[],
    },
    {
      day: "Wednesday",
      offering: [] as { course: string; location: string; tutor: string }[],
    },
    {
      day: "Thursday",
      offering: [] as { course: string; location: string; tutor: string }[],
    },
    {
      day: "Friday",
      offering: [] as { course: string; location: string; tutor: string }[],
    },
    {
      day: "Saturday",
      offering: [] as { course: string; location: string; tutor: string }[],
    },
    {
      day: "Sunday",
      offering: [] as { course: string; location: string; tutor: string }[],
    },
  ]);
  const date = new Date();
  const db = JSON.parse(localStorage.getItem("time-table") as any);

  if (db == null || db.length == 0) timeTable.value;
  else timeTable.value = db;
  const present = ref(date.toLocaleDateString("en-us", { weekday: "long" }));
  const time = date.toLocaleTimeString();

  const today = timeTable.value.find((item) => item.day == present.value)
    ?.offering as { course: string; location: string; tutor: string }[];

  return {
    editMode,
    timeTable,
    details,
    data,
    day,
    present,
    time,
    today,
    courseIndex,
    openOfferingModal,
    openEditModal,
  };
});
