<template>
  <div class="p-2">
    <Line
      :style="this.defaultHeight"
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
      for (let i = 0; i <= 52; i++) {
        weeks.push(i);
      }
      return weeks;
    },
  },
  watch: {
    //hack to force chart height to change on small screens and update fill and radius

    // vssWidth: function () {
    //   if (this.vssWidth < 800) {
    //     this.chartData.datasets[0].pointRadius = 0;
    //     this.chartData.datasets[0].fill = 'origin';
    //     this.defaultHeight = 'height: 200px';
    //   } else {
    //     this.chartData.datasets[0].pointRadius = 5;
    //     this.chartData.datasets[0].fill = false;
    //     this.defaultHeight = 'height: 400px';
    //   }
    // },

  },
  data() {
    return {
      //set default height to 400px if screen is larger than 800px and 200px if smaller
      defaultHeight: screen.width < 800 ? 'height: 200px' : 'height: 400px',
      chartData: {
        labels: this.getWeeks(),
        datasets: [
          {
            //set pointRadius to 0 if screen is smaller than 800px and 5 if larger
            pointRadius: screen.width < 800 ? 0 : 5,
            //set fill to 'origin' if screen is smaller than 800px and false if larger
            fill: screen.width < 800 ? 'origin' : false,
            label: "Commits",
            backgroundColor: "#39ace7",
            borderColor: "#39ace7",
            pointHoverRadius: 7,
            pointHitRadius: 10,
            data: this.commitData.weeklyCommitSummation,
            tension: 0.4,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins:{
          legend:{
            display: false
          },
          tooltip: {
            //prefix the text "weeks:" to the week we are hovering over
            callbacks: {
              title: function (context) {
                return "Week: " + (context[0].label);
              },
            }, 

        }
      },
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

<style></style>
