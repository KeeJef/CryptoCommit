<template>
  <Line
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :width="width"
    :height="height"
  />
</template>

<script>
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
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
);

export default {
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
    height: {
      type: Number,
      default: 300,
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
  data() {
    return {
      chartData: {
        labels: this.getWeeks(),
        datasets: [
          {
            label: "Commits",
            backgroundColor: "#f87979",
            data: [
              570, 376, 525, 504, 664, 266, 496, 747, 588, 543, 542, 394, 423,
              502, 547, 473, 644, 451, 606, 531, 582, 194, 232, 398, 673, 536,
              683, 547, 604, 624, 692, 546, 685, 673, 626, 501, 585, 641, 534,
              552, 478, 519, 714, 775, 687, 626, 467, 324, 542, 578, 513, 309,
            ],
            tension: 0.4,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales:{
          y:{
            title:{
              display: true,
              text : "Commits"
            }
          },
          x:{
            ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value) {
                       // return 4 ticks as months
                        if (value % 5 == 0) {
                          return value;
                        }
                    }
                },
            title:{
              display:true,
              text : "Weeks"
            }
          }
        }
      },
    };
  },
};
</script>

<style></style>
