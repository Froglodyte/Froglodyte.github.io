<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

</script>

<nav class="navbar">
  <div class="nav-container">
    <h1><b>Mud</b>it B<b>eng</b>ani</h1>
    <div class="nav-links">
      <button on:click={() => dispatch('navigate', { page: 'about' })}><h2><b>Abo</b>ut</h2></button>
      <button on:click={() => dispatch('navigate', { page: 'projects' })}><h2>Proj<b>ects</b></h2></button>
      <button on:click={() => dispatch('navigate', { page: 'socials' })}><h2><b>Soc</b>ials</h2></button>
    </div>
    <div>
    </div>
  </div>
</nav>

<style>
  .navbar {
    padding-inline: 5vw;
    padding-top: 1rem;
    padding-bottom: 1.4rem;
    margin: auto;
    bottom: 0;
    width: calc(100% - 10vw);
    position: fixed;
  }

  .nav-container {
    margin: 0 auto;
    background-color: var(--grey);
    border: 1.5px solid var(--primary);
    box-shadow: 4px 5px 0 var(--primary),
    -8px 10px 0 #6F8C6E,
    12px 15px 0 #506450,
    -16px 20px 0 #323D33;
    padding: 0.6rem 1.8rem;
    display: flex;
    align-items: center;
    transition: 0.2s all ease-out;
    max-width: 1000px;
  }

  .nav-links {
    margin-left: auto;
    display: flex;
    gap: 2.4rem;
  }

  h2 {
    margin: auto;
    padding: 0;
    color: var(--primary);
    font-family: 'xanh mono', sans-serif;
    font-style: italic;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s all ease-out;
  }

  h2:hover {
    text-shadow: 0 4px 0 #6f8c6e60,
    0 8px 0 #50645060,
    0 12px 0 #323D3360,
    0 -4px 0 #6f8c6e60,
    0 -8px 0 #50645060,
    0 -12px 0 #323D3360;
    transform: translate(0, -2px);
  }

  h1 {
    margin: 0;
    color: var(--primary);
    cursor: pointer;
  }

  button {
    all: unset;
    cursor: pointer;
  }
</style>