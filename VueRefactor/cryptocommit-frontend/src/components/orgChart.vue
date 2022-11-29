<template>
    <Line
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
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
    windowWidth: Number,
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
canvas{
  max-width: 1000px;
}
</style>
