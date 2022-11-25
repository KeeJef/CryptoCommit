<template>
  <menuBar :projectList="this.projectNames"></menuBar>
  <orgChart :commitData="this.projects[1]" class="w-80"></orgChart>

</template>

<script>
import menuBar from './components/menuBar.vue'
import orgChart from './components/orgChart.vue'
import axios from "axios";

export default {
  name: 'App',
  data() {
    return {
      projects:[],
      projectNames:[],
    };
  },
  components: {
    menuBar,
    orgChart
  },
  async mounted() {
    //fetch data using axios
    try {
    var response = await axios.get('http://127.0.0.1:8081/weeklyCoinCommitNumber.txt')
    this.projects =  response.data
    this.projectsNames = this.filterProjectName(this.projects)  
    } catch (error) {
      console.log("could not fetch chart data")
      console.log(error)
      return
    }

  },
  methods: {
    //get project names
    filterProjectName(list){
      
      var projectNames = []
      for (var i = 0; i < list.length; i++) {
        //todo fix this data being null in the script, we should never get null data from the api
        if (list[i] != null) {
          projectNames.push(list[i].title)
        }
      }
      return projectNames
    }
  }
}

</script>

<style>
#App{
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
</style>
