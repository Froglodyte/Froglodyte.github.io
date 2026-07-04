<script lang="ts">
  import { appState, type Theme } from './state.svelte';
  import { playChime, playHover } from './audio';

  const pages = ['about', 'projects', 'socials'];

  function capitalize(s: string) {
    if (s === 'about') return '<b>Abo</b>ut';
    if (s === 'projects') return 'Proj<b>ects</b>';
    if (s === 'socials') return '<b>Soc</b>ials';
    return s;
  }

  function handleNavigate(page: string) {
    appState.setView(page);
    playChime();
  }

  function handleMouseEnter() {
    playHover();
  }
</script>

<nav class="navbar">
  <div class="nav-container">
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <h1 
      onclick={() => handleNavigate('about')} 
      onmouseenter={handleMouseEnter}
      class="nav-logo"
    >
      <b>Mud</b>it B<b>eng</b>ani
    </h1>
    <div class="nav-links">
      {#each pages as page}
        <button 
          onclick={() => handleNavigate(page)} 
          onmouseenter={handleMouseEnter}
          class:active={appState.currentView === page}
          class="nav-btn"
        >
          <h2>{@html capitalize(page)}</h2>
        </button>
      {/each}
    </div>
  </div>
</nav>

<style>
  .navbar {
    width: 100%;
    max-width: none;
    z-index: 10;
    box-sizing: border-box;
    position: static;
    margin: 0;
    padding-inline: 1.5rem;
    padding-block: 0.5rem;
    background-color: var(--grey);
    border-top: var(--border);
  }

  .nav-container {
    margin: 0;
    background-color: transparent;
    border: none;
    box-shadow: none;
    padding: 0;
    display: flex;
    align-items: center;
    transition: var(--transition);
    width: 100%;
  }

  .nav-logo {
    margin: 0;
    cursor: pointer;
    font-size: 1.6rem;
    text-shadow: var(--glow);
    transition: var(--transition);
  }

  .nav-logo:hover {
    color: var(--white);
    text-shadow: var(--glow-strong);
  }

  .nav-links {
    margin-left: auto;
    display: flex;
    gap: 2rem;
  }

  .nav-btn {
    all: unset;
    cursor: pointer;
    position: relative;
  }

  h2 {
    margin: auto;
    padding: 0.2rem 0.6rem;
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
    border: 1.5px solid transparent;
  }

  .nav-btn:hover h2 {
    color: var(--white);
    text-shadow: var(--glow-strong);
    transform: translateY(-1px);
  }

  .nav-btn.active h2 {
    background: var(--primary);
    color: var(--black);
    border: 1.5px solid var(--primary);
    box-shadow: var(--glow);
    text-shadow: none;
  }

  @media (max-width: 768px) {
    .navbar {
      padding-inline: 1rem;
      padding-block: 0.5rem;
    }

    .nav-container {
      flex-direction: column;
    }

    .nav-links {
      margin-left: 0;
      margin-top: 0.4rem;
      width: 100%;
      justify-content: space-evenly;
      gap: 1rem;
    }

    .nav-logo {
      font-size: 1.3rem;
    }

    h2 {
      font-size: 1rem;
      padding: 0.1rem 0.4rem;
    }
    
    .nav-btn:hover h2 {
      transform: none;
    }
  }
</style>