<template>
  <div class="p-2">
    <Line
      :style = this.defaultHeight
      ref="lineInstance"
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
    />
    </div>
</template>

<script>
import { VueScreenSizeMixin } from 'vue-screen-size';
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  Filler,
} from "chart.js";

ChartJS.register(
  Filler,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
);

export default {
  mixins: [VueScreenSizeMixin],
  name: "orgChart",
  components: {
    Line,
  },
  props: {
    commitData: {},
    chartId: {
      type: String,
      default: "line-chart",
    },
  },
  methods: {
    //return array of numbers from 1 to 52
    getWeeks() {
      let weeks = [];
      for (let i = 1; i <= 52; i++) {
        weeks.push(i);
      }
      return weeks;
    },
  },
  watch: {
    //hack to force chart height to change on small screens and update fill and radius
    vssWidth: function () {
      if (this.vssWidth < 800) {
        this.chartData.datasets[0].pointRadius = 0;
        this.chartData.datasets[0].fill = 'origin';
        this.defaultHeight = 'height: 200px';    
      } else {
        this.chartData.datasets[0].pointRadius = 5;
        this.chartData.datasets[0].fill = false;
        this.defaultHeight = 'height: 400px';    
      }
    },

  },
  mounted(){
    //use screen.width because we have access to it non responsively on mounted
    if(screen.width < 800){
      this.chartData.datasets[0].pointRadius = 0;
        this.chartData.datasets[0].fill = 'origin';
        this.defaultHeight = 'height: 200px';   
    }
  },
  data() {
    return {
      defaultHeight:'height: 400px',
      chartData: {
        labels: this.getWeeks(),
        datasets: [
          {
            //change fill, tension and pointRadius when screen size is below sm 
            label: "Commits",
            backgroundColor: "#39ace7",
            borderColor: "#39ace7",
            pointHoverRadius: 7,
            pointRadius: 5,
            pointHitRadius: 10,
            data: this.commitData.weeklyCommitSummation,
            tension: 0.4,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            title: {
              display: true,
              text: "Number of Commits",
            },
          },
          x: {
            ticks: {
              callback: function (value) {
                // return 4 ticks as months
                if (value % 5 == 0) {
                  return value;
                }
              },
            },
            title: {
              display: true,
              text: "Week",
            },
          },
        },
      },
    };
  },
};
</script>

<style>


</style>
