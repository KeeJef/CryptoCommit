<template>
  <menuBar :showSorting="false"></menuBar>

  <div class="flex flex-col justify-center mx-10 mt-10 xl:mx-80">
    <div class="flex flex-col mt-5">
      <div class="text-2xl font-bold flex justify-start pb-2 text-left">
        What is Cryptocommit?
      </div>
      <div class="text-xl flex justify-start text-left pb-5">
        Cryptocommit aggregates Github statistics for different crypto projects
        and allows users to compare different crypto projects on a number of
        metrics.
      </div>
    </div>

    <div class="flex flex-col mt-5">
      <div class="text-2xl font-bold flex justify-start pb-2 text-left">
        How is this site different from CryptoMiso and other developer score
        related websites?
      </div>
      <div class="text-xl flex justify-start text-left pb-5">
        <p>
          Typically these sites only show data from the main repository of a
          project, this can mean that data inaccurately represents the developer
          activity of a project. For example if a website only tracks the
          <a
            class="text-blue-400"
            href="https://github.com/ethereum/go-ethereum"
            >go-ethereum</a
          >
          repository in the Ethereum Github organization they would miss all the
          work on other popular Ethereum cryptographic libraries.
        </p>
      </div>
    </div>

    <div class="flex flex-col mt-5">
      <div class="text-2xl font-bold flex justify-start pb-2 text-left">
        What is a commit?
      </div>
      <div class="text-xl flex justify-start text-left pb-5">
        <p>
          Commits are made when a software developer wants to save the changes
          they have made to the code of a particular project they are working
          on, a commit may contain changes to thousands of lines of code or a
          single line of code, and provides a snapshot of the changes a
          developer makes.
        </p>
      </div>
    </div>

    <div class="flex flex-col mt-5">
      <div class="text-2xl font-bold flex justify-start pb-2 text-left">
        Is this data useful?
      </div>
      <div class="text-xl flex justify-start text-left pb-5">
        <p>
          Counting commits alone is a very crude way to assess the developer
          activity of a project, for example some developers may commit fairly
          infrequently, but include large changes, whereas some developers
          commit very frequently with small changes. In this case although the
          overall end state of the development activity is the same CryptoCommit
          will indicate and preference developers who make small commits
          frequently. This is a fundamental flaw in the design of Cryptocommit,
          however my hope is that the data here is only used as an initial
          investigation point to dig deeper into project which may have high
          indicated activity, instead of the sole basis for preferencing one
          project over another.
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
          The repository must be under the official organization account, and
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
