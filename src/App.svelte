<script lang="ts">
  import Nav from './lib/nav.svelte';
  import About from './lib/about.svelte';
  import Projects from './lib/projects.svelte';
  import Socials from './lib/socials.svelte';
  import { slideWithFade } from './lib/transitions';
  import Dither from './lib/components/dither.svelte';

  let currentView = 'about';

  const components: Record<string, any> = {
    projects: Projects,
    about: About,
    socials: Socials,
  };

  function handleNavigate(event: CustomEvent<{ page: string }>) {
    currentView = event.detail.page;
  }
</script>

<main>
  <div class="background">
    <Dither
      waveColor={[0.18, 0.22, 0.18]}
      waveFrequency={5}
      colorNum={4}
      pixelSize={2}
    />
  </div>

  <div id="main">
    {#key currentView}
      <div transition:slideWithFade={{}}>
        <svelte:component this={components[currentView]} />
      </div>
    {/key}
  </div>
  <Nav on:navigate={handleNavigate} />
</main>

<style>
  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;
  }
</style>