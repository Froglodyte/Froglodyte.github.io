<script lang="ts">
  import { onMount } from 'svelte';

  let age = 0;
  const birthDate = new Date(2006, 0, 19, 12).getTime();

  onMount(() => {
    const interval = setInterval(() => {
      age = (Date.now() - birthDate) / (1000 * 3600 * 24 * 365.25);
    }, 50);
    return () => clearInterval(interval);
  });
</script>

<div class="content">
  <h1><b>Abo</b>ut M<b>e</b></h1>
  <div class="data">
    <ul>
      <li><span class="emph">{age.toFixed(10)}</span> Years Old</li>
      <li>Somewhere in <span class="emph">Mumbai</span> <span class="unemph">(usually)</span></li>
      <li><span class="emph">Electronics and Telecommunications</span> Engineering Major</li>
      <li>Student @ <span class="emph">VJTI, Mumbai</span></li>
      <li><span class="emph">Low-Level</span> Development Enthusiast</li>
      <li>Skillset:
        <ul style="margin-bottom:1rem;">
          <li><span class="unemph" style="font-weight:500">Languages: </span> C, C++, Rust, JS, TS, HTML, CSS, Assembly, WASM</li>
          <li><span class="unemph" style="font-weight:500">Tech: </span> Svelte, Node.js, Deno, LLVM, Vite, Nginx, Tomcat</li>
          <li><span class="unemph" style="font-weight:500">Interests: </span> Fullstack, Low-Level, Systems Programming</li>
        </ul>
      </li>
      <li>I'm just putting this one here to <span class="emph">fill space</span></li>
    </ul>
  </div>
</div>