<template>
  <menuBar :showSorting="false"></menuBar>

  <div class="flex flex-col justify-center mx-10 mt-10 xl:mx-80">
    <div class="flex flex-col mt-5">
      <div class="text-2xl font-bold flex justify-start pb-2 text-left">
        What is Cryptocommit?
      </div>
      <div class="text-xl flex justify-start text-left pb-5">
        Cryptocommit is a tool that collects and aggregates Github statistics for various cryptocurrency projects, providing users with a way to evaluate different projects based on various metrics.
      </div>
    </div>

    <div class="flex flex-col mt-5">
      <div class="text-2xl font-bold flex justify-start pb-2 text-left">
        How is this site different from CryptoMiso and other developer score
        related websites?
      </div>
      <div class="text-xl flex justify-start text-left pb-5">
        <p>
          Cryptocommit distinguishes itself from other developer score websites like CryptoMiso by collecting data from all repositories within a project, not just the main repository. This approach ensures that the developer activity of a project is accurately represented, as important work may be done in other repositories. For example, if a website only tracks the
          <a
            class="text-blue-400"
            href="https://github.com/ethereum/go-ethereum"
            >go-ethereum</a
          >
          repository within the Ethereum Github organization, it would fail to capture the activity on other popular Ethereum cryptographic libraries.
        </p>
      </div>
    </div>

    <div class="flex flex-col mt-5">
      <div class="text-2xl font-bold flex justify-start pb-2 text-left">
        What is a commit?
      </div>
      <div class="text-xl flex justify-start text-left pb-5">
        <p>
          A commit is a record of changes made by a software developer to the code of a project. It is a snapshot of the modifications made to the codebase. A commit can include changes to a single line or thousands of lines of code. It is a way for developers to save and track the progress of their work on a project.
        </p>
      </div>
    </div>

    <div class="flex flex-col mt-5">
      <div class="text-2xl font-bold flex justify-start pb-2 text-left">
        Is this data useful?
      </div>
      <div class="text-xl flex justify-start text-left pb-5">
        <p>
          Counting commits alone is an imprecise way to evaluate developer activity on a project. The frequency and size of commits can vary greatly among developers. For example, a developer who commits infrequently but includes large changes may be considered less active than a developer who commits frequently with small changes. Therefore, the data provided by Cryptocommit should be used as a starting point for further investigation, rather than being the sole basis for evaluating a project.
        </p>
      </div>
    </div>

    <div class="flex flex-col mt-5">
      <div class="text-2xl font-bold flex justify-start pb-2 text-left">
        What are the metrics for having a repository included in the aggregation
        for a project?
      </div>
      <div class="text-xl flex justify-start text-left pb-5">
        <p>
          The repository must be under the official organisation account, and
          have at least 20 Github ‘Stars’, for example
          <a
            class="text-blue-400"
            href="https://github.com/ethereum/go-ethereum"
            >go-ethereum</a
          >
          exists as a repo under the Ethereum Github organization and has ~40k
          stars, so it is eligible for inclusion in the aggregate commit count.
        </p>
      </div>
    </div>

    <div class="flex flex-col mt-5">
      <div class="text-2xl font-bold flex justify-start pb-2 text-left">
        Can you add non Github based projects?
      </div>
      <div class="text-xl flex justify-start text-left pb-5">
        <p>
          Sorry not right now, this means prominent projects like Thorchain and
          Tezos which collaborate primarily on Gitlab are not being properly
          represented here. I am working on a solution to this problem, but it
          will take some time
        </p>
      </div>
    </div>

    <div class="flex flex-col mt-5">
      <div class="text-2xl font-bold flex justify-start pb-2 text-left">
        What is shown in the commit chart?
      </div>
      <div class="text-xl flex justify-start text-left pb-5">
        <p>
          The last 52 weeks of aggregate commit data for each project is shown,
          this should show indication of recent activity.
        </p>
      </div>
    </div>

    <div class="flex flex-col mt-5">
      <div class="text-2xl font-bold flex justify-start pb-2 text-left">
        How can I verify your data?
      </div>
      <div class="text-xl flex justify-start text-left pb-5">
        <p>
          This entire project is open source, including the two main scripts
          which i am using to fetch this data from Github, you can read and run
          these scripts yourself
          <a
            class="text-blue-400"
            href="https://github.com/KeeJef/CryptoCommit/tree/VueRefactor/VueRefactor/serverSide/scripts"
            >here.</a
          >
        </p>
      </div>
    </div>

    <div class="flex flex-col mt-5">
      <div class="text-2xl font-bold flex justify-start pb-2 text-left">
        How is the market weighted score calculated?
      </div>
      <div class="text-xl flex justify-start text-left pb-10">
        <p>
          (Total yearly commits / Market cap fetched from CoinGecko) / 1000 <br> <br>

Dividing by 1000 just makes the score easier to display on the website, in this case a market weighted score of less is better, since essentially what you are calculating is market cap by commits that year, which is akin to the “Cost per commit”. 

        </p>
      </div>
    </div>
  </div>
</template>

<script>
import menuBar from "../components/menuBar.vue";

export default {
  name: "AboutView",
  data() {
    return {};
  },
  components: {
    menuBar,
  },
  mounted() {
    window.scrollTo(0, 0)
  },
};
</script>

<style>
#App {
  font-family: "Helvetica Neue", "Helvetica", "Arial", "sans-serif";
}
</style>
