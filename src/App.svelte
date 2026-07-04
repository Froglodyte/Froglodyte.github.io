<script lang="ts">
  import Nav from './lib/nav.svelte';
  import About from './lib/about.svelte';
  import Projects from './lib/projects.svelte';
  import Socials from './lib/socials.svelte';
  import { slideWithFade } from './lib/transitions';
  import SysWidgets from './lib/components/syswidgets.svelte';
  import Terminal from './lib/components/terminal.svelte';
  import Matrix from './lib/components/matrix.svelte';
  import { appState } from './lib/state.svelte';

  const components: Record<string, any> = {
    projects: Projects,
    about: About,
    socials: Socials,
  };
</script>

<div class="crt">
  <div class="crt-flicker-overlay"></div>
  <div class="crt-bezel"></div>
  
  <main>
    <div class="background"></div>

    <div id="main">
      <div class="cyberdeck-container">
        <!-- Deck Header Status -->
        <header class="deck-header">
          <div class="deck-status">
            <span class="status-dot"></span>
            <span>SYSTEM CONSOLE // USER: GUEST // NODE: MUDIT_BENGANI</span>
          </div>
          <div class="deck-time">
            <span>SECURE LINK: ACTIVE</span>
          </div>
        </header>

        <div class="deck-body">
          <!-- Left Sidebar Widget Area -->
          <aside class="deck-sidebar">
            <SysWidgets />
          </aside>

          <section class="deck-content">
            {#if appState.matrixActive}
              <div class="matrix-overlay">
                <Matrix />
              </div>
            {/if}
            
            {#key appState.currentView}
              <div transition:slideWithFade={{}}>
                <svelte:component this={components[appState.currentView]} />
              </div>
            {/key}
          </section>
        </div>

        <!-- Interactive Terminal CLI at bottom -->
        <footer class="deck-terminal">
          <Terminal />
        </footer>

        <!-- Bottom Nav bar -->
        <Nav />
      </div>
    </div>
  </main>
</div>

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