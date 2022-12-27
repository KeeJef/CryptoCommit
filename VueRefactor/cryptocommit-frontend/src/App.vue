<template>
  <menuBar
    @projectSelected="processSearchSelection($event)"
    @sortProjectsByCommits="sortProjectsByCommits"
    @sortProjectsByWeighted="sortProjectsByWeighted"
    :projectList="this.projectNames"
  ></menuBar>

  <div
    :id="project.title"
    :ref="project.title"
    v-for="project in this.currentlyShowProjects"
    :key="project"
  >
    <div
      v-if="project"
      class="mx-2 mt-2 mb-5 rounded-md shadow-xl border-slate-100 border-2 lg:mx-32 xl:mx-60 relative"
    >
      <div class="flex justify-center text-xl font-bold pt-2">
        <a target="blank" :href="project.coreURL">{{ project.title }} </a>
      </div>

      <div class="flex justify-between text-lg px-2 md:px-5">
        <div class="flex flex-col">
          <div class="flex items-center self-start">
            Commit Rank
            <span
              class="ml-1 py-0.5 px-2 bg-green-500 rounded-md text-white font-bold"
              >{{ project.rank }}</span
            >
          </div>
          <div class="flex items-center self-start text-xs pt-1">
            Market Cap Weighted Score:
            <span class="pl-1">{{
              Math.round(project.marketCapWeightedScore * 10) / 10
            }}</span>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="flex items-center justify-end text-xs md:text-lg">
            Total Commits<span
              class="ml-2 py-0.5 px-2 bg-green-500 rounded-md text-white font-bold"
              >{{ project.totalCommits }}</span
            >
          </div>
          <div class="text-xs flex justify-end">
            Repos Tracked: {{ project.totalRepoCount }}
          </div>
          <div class="text-xs flex justify-end">
            Top Repo:
            <a class="pl-1" :href="project.topRepoURL">
              {{ project.topRepoURL.split("/")[4] }}</a
            >
          </div>
        </div>
      </div>
      <orgChart :commitData="project"></orgChart>
    </div>
  </div>
  <div v-if="this.projects.length" class="flex justify-center">
    <pageCounter
      @changePage="updatePage($event)"
      :maxItems="projects.length"
      :itemsPerPage="10"
    ></pageCounter>
  </div>
</template>

<script>
import menuBar from "./components/menuBar.vue";
import pageCounter from "./components/pageCounter.vue";
import orgChart from "./components/orgChart.vue";
import axios from "axios";
import { nextTick } from "vue";

export default {
  name: "App",
  data() {
    return {
      projects: [],
      projectNames: [],
      currentlyShowProjects: [],
      resultsPerPage: 10,
    };
  },
  components: {
    menuBar,
    orgChart,
    pageCounter,
  },
  async mounted() {
    //fetch data using axios
    try {
      var response = await axios.get(
        "http://192.168.0.6:8081/weeklyCoinCommitNumber.txt"
      );
      this.projects = response.data;
      this.projectNames = await this.filterProjectName(this.projects);
      this.currentlyShowProjects = this.projects.slice(0, this.resultsPerPage);
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
    updatePage(page) {
      if (page == 1) {
        this.currentlyShowProjects = this.projects.slice(
          0,
          this.resultsPerPage
        );
      } else {
        this.currentlyShowProjects = this.projects.slice(
          (page - 1) * this.resultsPerPage,
          page * this.resultsPerPage
        );
      }
      window.scrollTo(0, 0);
    },

    sortProjectsByCommits() {
      this.projects.sort((a, b) => {
        return b.totalCommits - a.totalCommits;
      });
      this.updatePage(1);
    },

    sortProjectsByWeighted() {
      //sort by weighted score lowest to highest, any null values will be at the end of the list
      this.projects.sort((a, b) => {
        if (a.marketCapWeightedScore == null) {
          return 1;
        } else if (b.marketCapWeightedScore == null) {
          return -1;
        } else {
          return a.marketCapWeightedScore - b.marketCapWeightedScore;
        }
      });
      this.updatePage(1);
    },

    async processSearchSelection(projectName) {
      //find index of projectName in projectNames array
      var index = this.projectNames.indexOf(projectName);
      //array is 0 indexed, so add 1 to the index we calculated
      var pageNumber = (index + 1) / this.resultsPerPage;
      pageNumber = Math.ceil(pageNumber);
      this.updatePage(pageNumber);
      //wait for page to update then scroll to project
      await nextTick();

      var container = this.$refs[projectName][0];
      container.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
      //this API can be fed multiple coin at once
      //https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_market_cap=true
    },
  },
};
</script>

<style>
#App {
  font-family: "Helvetica Neue", "Helvetica", "Arial", "sans-serif";
}
</style>
