<script>
  import Header from "./components/Header.svelte";
  import Navigation from "./components/Navigation.svelte";
  import QuestionsList from "./components/QuestionsList.svelte";
  import Tasks from "./components/Tasks.svelte";
</script>

<main>
  <Header />
  <Navigation />
  <div class="w-full sm:w-1/2 ml-auto mr-auto p-2">
    <QuestionsList />
    <Tasks />
  </div>
</main>
