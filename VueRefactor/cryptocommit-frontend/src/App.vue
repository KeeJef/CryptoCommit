<template>
  <menuBar :projectList="this.projectNames"></menuBar>

   <div v-for="project in this.projects" :key="project">
    <div
      v-if="project"
      class="mx-2 mt-5 rounded-sm shadow-xl border-slate-100 border-2 lg:mx-32 xl:mx-60 relative"
    >
      <div class="flex justify-between text-lg px-2 pt-2 md:px-5">
        <div class="flex self-start">
          Rank
          <span
            class="ml-1 py-1 px-2 bg-green-500 rounded-md text-white font-bold"
          >{{}}</span>
        </div>
        <div class="flex flex-col">
          <div class="flex justify-end">
            Total Yearly Commits<span
              class="ml-2 py-1 px-2 bg-green-500 rounded-md text-white font-bold"
              >{{ project.totalCommits }}</span
            >
          </div>
          <div class="text-xs flex justify-end">
            Total Repos Tracked: {{project.totalRepoCount }}
          </div>
        </div>
      </div>
      <div style="left:46%" class="text-xl font-bold top-5 absolute">
          <a target="blank" :href="project.coreURL"
            >{{project.title }}
          </a>
        </div>
      <orgChart :commitData="project"></orgChart>
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
  font-family: "Helvetica Neue", "Helvetica", "Arial", "sans-serif";
}
</style>
