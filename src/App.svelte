<script>
  import Header from "./components/Header.svelte";
  import Footer from "./components/Footer.svelte";
  import Navigation from "./components/Navigation.svelte";
  import QuestionsList from "./components/QuestionsList.svelte";
  import Tasks from "./components/Tasks.svelte";
</script>

<main class="w-full sm:w-1/2 ml-auto mr-auto p-2">
  <Header />
  <Navigation />
  <Tasks />
  <QuestionsList />
  <Footer />
</main>
