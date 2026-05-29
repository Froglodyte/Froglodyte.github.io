<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  const pages = ['about', 'projects', 'socials'];

  function capitalize(s: string) {
    if (s === 'about') return '<b>Abo</b>ut';
    if (s === 'projects') return 'Proj<b>ects</b>';
    if (s === 'socials') return '<b>Soc</b>ials';
    return s;
  }
</script>

<nav class="navbar">
  <div class="nav-container">
    <h1 on:click={() => dispatch('navigate', { page: 'about' })}>
      <b>Mud</b>it B<b>eng</b>ani
    </h1>
    <div class="nav-links">
      {#each pages as page}
        <button on:click={() => dispatch('navigate', { page })}>
          <h2>{@html capitalize(page)}</h2>
        </button>
      {/each}
    </div>
  </div>
</nav>

<style>
  .navbar {
    padding-inline: 5vw;
    padding-block: 1rem 1.4rem;
    margin: auto;
    bottom: 0;
    width: calc(100% - 10vw);
    position: fixed;
    z-index: 10;
  }

  .nav-container {
    margin: 0 auto;
    background-color: var(--grey);
    border: var(--border);
    box-shadow: 
      4px 5px 0 var(--primary),
      -8px 10px 0 #6F8C6E,
      12px 15px 0 #506450,
      -16px 20px 0 #323D33;
    padding: 0.6rem 1.8rem;
    display: flex;
    align-items: center;
    transition: var(--transition);
    max-width: 1000px;
  }

  .nav-links {
    margin-left: auto;
    display: flex;
    gap: 2.4rem;
  }

  h1 {
    margin: 0;
    cursor: pointer;
  }

  h2 {
    margin: auto;
    padding: 0;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
  }

  h2:hover {
    text-shadow: 
      0 4px 0 #6f8c6e60,
      0 8px 0 #50645060,
      0 12px 0 #323D3360,
      0 -4px 0 #6f8c6e60,
      0 -8px 0 #50645060,
      0 -12px 0 #323D3360;
    transform: translateY(-2px);
  }

  button {
    all: unset;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    .navbar {
      position: static;
      width: auto;
      padding-inline: 1rem;
      padding-block: 1rem;
    }

    .nav-container {
      padding: 0.6rem 1rem;
      flex-direction: column;
      box-shadow: 
        2px 3px 0 var(--primary),
        -4px 5px 0 #6F8C6E;
      width: auto;
    }

    .nav-links {
      margin: 0;
      gap: 1.5rem;
      flex-wrap: wrap;
      justify-content: space-evenly;
      width: 100%;
      margin-top: 0.5rem;
    }

    h1 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }

    h2 {
      font-size: 1.2rem;
    }

    h2:hover {
      transform: none;
      text-shadow: none;
    }
  }
</style>