<script lang="ts">
  import { onMount } from 'svelte';
  import { playHover } from './audio';

  let age = $state(0);
  const birthDate = new Date(2006, 0, 19, 12).getTime();

  onMount(() => {
    const interval = setInterval(() => {
      age = (Date.now() - birthDate) / (1000 * 3600 * 24 * 365.25);
    }, 50);
    return () => clearInterval(interval);
  });
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="content">
  <h1><b>Abo</b>ut M<b>e</b></h1>
  
  <div class="about-grid">
    <div class="profile-card" onmouseenter={playHover}>
      <div class="image-wrapper">
        <img src="./frog.png" alt="Frog mascot" class="dossier-image" />
        <div class="scanlines-overlay"></div>
      </div>
      <div class="dossier-meta">
        <div class="meta-item"><span class="label">ID:</span> <span class="white-text">FROGLODYTE_01</span></div>
        <div class="meta-item"><span class="label">LOC:</span> <span class="white-text">MUMBAI, IN</span></div>
        <div class="meta-item"><span class="label">STATUS:</span> <span class="white-text emph blink">SECURE</span></div>
      </div>
    </div>

    <div class="dossier-details">
      <div class="telemetry-block" onmouseenter={playHover}>
        <div class="block-title">USER LIFETIME TELEMETRY</div>
        <div class="block-value">{age.toFixed(10)} <span class="label">YEARS</span></div>
      </div>

      <div class="dossier-list">
        <div class="dossier-row" onmouseenter={playHover}>
          <div class="dossier-label">> EDUCATION:</div>
          <div class="dossier-val">Electronics & Telecommunications @ <span class="white-text font-bold">VJTI, Mumbai</span></div>
        </div>
        <div class="dossier-row" onmouseenter={playHover}>
          <div class="dossier-label">> DISCIPLINE:</div>
          <div class="dossier-val"><span class="emph">Low-Level Systems</span> & High-Performance Development</div>
        </div>
        <div class="dossier-row" onmouseenter={playHover}>
          <div class="dossier-label">> TECH STACK:</div>
          <div class="dossier-val">
            <div class="chips-container">
              <span class="chip">C</span>
              <span class="chip">C++</span>
              <span class="chip">Rust</span>
              <span class="chip">TS/JS</span>
              <span class="chip">Assembly</span>
              <span class="chip">Svelte</span>
              <span class="chip">LLVM</span>
              <span class="chip">WASM</span>
            </div>
          </div>
        </div>
        <div class="dossier-row" onmouseenter={playHover}>
          <div class="dossier-label">> CORE INTERESTS:</div>
          <div class="dossier-val">Systems Programming, Operating Systems, Compilers, Cyberdeck Engineering, and Retro-Computing.</div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .about-grid {
    display: flex;
    gap: 1.5rem;
    align-items: flex-start;
    margin-top: 1rem;
  }

  .profile-card {
    width: 180px;
    border: var(--border);
    background: rgba(0, 0, 0, 0.4);
    padding: 0.8rem;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    box-sizing: border-box;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }

  .image-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    border: 1px solid var(--border-color);
    background: #000;
    overflow: hidden;
  }

  .dossier-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: sepia(1) hue-rotate(60deg) saturate(3) brightness(0.85) contrast(1.2); /* Retro green screen effect */
    transition: var(--transition);
  }

  :global([data-theme="amber"]) .dossier-image {
    filter: sepia(1) hue-rotate(0deg) saturate(3) brightness(0.85) contrast(1.2);
  }

  :global([data-theme="pink"]) .dossier-image {
    filter: sepia(1) hue-rotate(280deg) saturate(3) brightness(0.85) contrast(1.2);
  }

  :global([data-theme="silver"]) .dossier-image {
    filter: grayscale(1) brightness(0.9) contrast(1.2);
  }

  .profile-card:hover .dossier-image {
    filter: none;
  }

  .scanlines-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%);
    background-size: 100% 4px;
    pointer-events: none;
  }

  .dossier-meta {
    font-size: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .meta-item {
    display: flex;
    justify-content: space-between;
  }

  .label {
    color: var(--secondary);
  }

  .white-text {
    color: var(--white);
    text-shadow: var(--glow);
  }

  .font-bold {
    font-weight: 600;
  }

  .blink {
    animation: blinker 1s step-start infinite;
  }

  @keyframes blinker {
    50% { opacity: 0; }
  }

  .dossier-details {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .telemetry-block {
    background: var(--grey);
    border: var(--border);
    padding: 0.6rem 1rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }

  .block-title {
    font-size: 0.7rem;
    color: var(--secondary);
    margin-bottom: 0.2rem;
  }

  .block-value {
    font-size: 1.4rem;
    font-weight: bold;
    color: var(--white);
    text-shadow: var(--glow-strong);
  }

  .dossier-list {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .dossier-row {
    border-bottom: 1px solid rgba(var(--primary), 0.1);
    padding-bottom: 0.5rem;
  }

  .dossier-label {
    font-size: 0.8rem;
    color: var(--secondary);
    margin-bottom: 0.2rem;
    font-weight: 600;
  }

  .dossier-val {
    font-size: 0.95rem;
    color: var(--primary);
  }

  .chips-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-top: 0.2rem;
  }

  .chip {
    font-size: 0.75rem;
    border: 1px solid var(--border-color);
    padding: 0.1rem 0.4rem;
    border-radius: 2px;
    background: rgba(var(--primary), 0.05);
    transition: var(--transition);
  }

  .chip:hover {
    background: var(--primary);
    color: var(--black);
    text-shadow: none;
  }

  @media (max-width: 768px) {
    .about-grid {
      flex-direction: column;
      align-items: center;
    }

    .profile-card {
      width: 100%;
      max-width: 250px;
    }
  }
</style>