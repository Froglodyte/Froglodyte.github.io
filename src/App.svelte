<script lang="ts">
  import Nav from './lib/nav.svelte';
  import About from './lib/about.svelte';
  import Projects from './lib/projects.svelte';
  import Socials from './lib/socials.svelte';
  import { slideWithFade } from './lib/transitions';

  let currentView = 'about';

  const components: Record<string, any> = {
    projects: Projects,
    about: About,
    socials: Socials,
  };

  function handleNavigate(event: CustomEvent<{ page: string }>) {
    currentView = event.detail.page;
  }

  function handleMousemove(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    target.style.setProperty('--x', `${event.clientX}px`);
    target.style.setProperty('--y', `${event.clientY}px`);
  }
</script>

<main on:mousemove={handleMousemove}>
  <div id="main">
    {#key currentView}
      <div transition:slideWithFade={{}}>
        <svelte:component this={components[currentView]} />
      </div>
    {/key}
  </div>
  <Nav on:navigate={handleNavigate} />
</main>