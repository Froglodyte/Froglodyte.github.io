<script lang="ts">
  import Nav from './lib/nav.svelte'
  import About from './lib/about.svelte'
  import Projects from './lib/projects.svelte'
  import Socials from './lib/socials.svelte'

  let currentView = 'projects';

  function handleNavigate(event: CustomEvent<{ page: string }>) {
    currentView = event.detail.page;
  }
</script>

<main>
  <div id = "main">
    {#if currentView == 'projects'}
      <Projects />
    {:else if currentView == 'about'}
      <About />
    {:else}
      <Socials />
    {/if}
  </div>
  <Nav on:navigate={handleNavigate} />
</main>
