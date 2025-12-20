<script lang="ts">
  import Nav from './lib/nav.svelte'
  import About from './lib/about.svelte'
  import Projects from './lib/projects.svelte'
  import Socials from './lib/socials.svelte'
  import { slide } from 'svelte/transition';

  let currentView = 'about';

  const components: Record<string, any> = {
    projects: Projects,
    about: About,
    socials: Socials,
  };

  function handleNavigate(event: CustomEvent<{ page: string }>) {
    currentView = event.detail.page;
  }

  let x = 0;
  let y = 0;

  function handleMousemove(event: MouseEvent) {
    x = event.clientX;
    y = event.clientY;
  }
</script>

<main on:mousemove={handleMousemove} style="--x:{x}px; --y:{y}px;">
  <div id = "main">
    {#key currentView}
      <div transition:slide>
        <svelte:component this={components[currentView]} />
      </div>
    {/key}
  </div>
  <Nav on:navigate={handleNavigate} />
</main>

