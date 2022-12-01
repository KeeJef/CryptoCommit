<template>
  <menuBar :projectList="this.projectNames"></menuBar>
  <div class="">
    <div
      v-if="this.projects[1]"
      class="mx-2 mt-5 rounded-sm shadow-xl border-slate-100 border-2 lg:mx-32 xl:mx-60"
    >
      <div class="flex justify-center text-lg font-bold">
        {{ this.projects[1].title }}
      </div>
      <orgChart :commitData="this.projects[1]"></orgChart>
    </div>
  </div>

  <div class="">
    <div
      v-if="this.projects[1]"
      class="mx-5 mt-5 rounded-sm shadow-xl border-slate-100 border-2 lg:mx-32 xl:mx-60"
    >
      <div class="flex justify-center text-lg font-bold">
        {{ this.projects[1].title }}
      </div>
      <orgChart :commitData="this.projects[1]"></orgChart>
    </div>
  </div>
</template>

<script>
import menuBar from "./components/menuBar.vue";
import orgChart from "./components/orgChart.vue";
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      projects: [],
      projectNames: [],
    };
  },
  components: {
    menuBar,
    orgChart,
  },
  async mounted() {
    //fetch data using axios
    try {
      var response = await axios.get(
        "http://127.0.0.1:8081/weeklyCoinCommitNumber.txt"
      );
      this.projects = response.data;
      this.projectNames = await this.filterProjectName(this.projects);
    } catch (error) {
      console.log("could not fetch chart data");
      console.log(error);
      return;
    }
  },
  methods: {
    //get project names
    async filterProjectName(list) {
      var projectNames = [];
      for (var i = 0; i < list.length; i++) {
        //todo fix this data being null in the script, we should never get null data from the api
        if (list[i] != null) {
          projectNames.push(list[i].title);
        }
      }
      return projectNames;
    },
  },
};
</script>

<style>
#App {
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
</style>
