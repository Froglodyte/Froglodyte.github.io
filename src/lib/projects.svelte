<script lang="ts">
  import { playHover, playClick } from './audio';

  const projects = [
    {
      name: 'TycheOS',
      sector: 'SECTOR_01',
      desc: 'A bare-metal, modular hobby kernel and operating system designed for the Raspberry Pi 3B.',
      link: 'https://github.com/Froglodyte/TycheOS',
      tech: ['C', 'Assembly', 'Raspi 3B'],
      logs: [
        'Initializing MMU...',
        'Loading kernel sectors...',
        'All 4 cores activated successfully.',
        'TycheOS v0.1 ready.'
      ]
    },
    {
      name: 'LLVM Obfuscator',
      sector: 'SECTOR_02',
      desc: 'An IR-level code obfuscation tool leveraging LLVM passes to flatten control flow and substitute instructions.',
      link: 'https://github.com/Froglodyte/LLVM_Obfuscator',
      tech: ['C++', 'LLVM IR', 'CMake'],
      logs: [
        'Running ObfuscatorPass...',
        'Flattening control flow graphs...',
        'Substituting 142 instructions...',
        'Binary obfuscation completed.'
      ]
    },
    {
      name: 'Transformer Firewall',
      sector: 'SECTOR_03',
      desc: 'A modern web application firewall (WAF) utilizing a fine-tuned BERT model to detect and block SQLi/XSS payloads.',
      link: 'https://github.com/Froglodyte',
      tech: ['Python', 'BERT', 'Svelte', 'WASM'],
      logs: [
        'Loading BERT weights (WASM)...',
        'Model initialized in 42ms.',
        'WAF monitoring active.',
        'Threat score: 0.00'
      ]
    },
    {
      name: '2D Physics Engine',
      sector: 'SECTOR_04',
      desc: 'An educational impulse-based 2D rigid body physics simulator built in pure JavaScript.',
      link: 'https://github.com/Froglodyte/ball-physics',
      tech: ['JavaScript', 'HTML5 Canvas'],
      logs: [
        'Initializing broadphase grid...',
        'AABB sweep & prune ready.',
        'Warning: FPS jitter detected.',
        'Impulse resolution online.'
      ]
    }
  ];

  let activeIndex = $state<number | null>(null);

  function handleMouseEnter(index: number) {
    activeIndex = index;
    playHover();
  }

  function handleMouseLeave() {
    activeIndex = null;
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="content">
  <h1><b>P</b>roj<b>ects</b></h1>
  
  <div class="projects-grid">
    {#each projects as project, index}
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <a 
        href={project.link} 
        target="_blank" 
        rel="noopener noreferrer"
        class="project-card"
        onmouseenter={() => handleMouseEnter(index)}
        onmouseleave={handleMouseLeave}
        onclick={playClick}
      >
        <div class="card-header">
          <span class="sector-code">{project.sector}</span>
          <span class="status-marker">[READY]</span>
        </div>
        
        <h2 class="project-title">{project.name}</h2>
        <p class="project-desc">{project.desc}</p>
        
        <div class="project-tech">
          {#each project.tech as t}
            <span class="tech-tag">{t}</span>
          {/each}
        </div>

        <div class="card-console" class:active={activeIndex === index}>
          <div class="console-title">SIMULATED LOG READOUT</div>
          <div class="console-logs">
            {#each project.logs as log}
              <div class="console-line">> {log}</div>
            {/each}
          </div>
        </div>
      </a>
    {/each}
  </div>

  <div class="github-footer" onmouseenter={playHover}>
    <span>AND MANY MORE UTILITIES STORED AT:</span>
    <a href="https://github.com/Froglodyte" target="_blank" rel="noopener noreferrer" class="emph" onclick={playClick}>
      GITHUB.EXE
    </a>
  </div>
</div>

<style>
  .projects-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.2rem;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
  }

  .project-card {
    display: flex;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.4);
    border: var(--border);
    padding: 1rem;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
    transition: all var(--transition);
  }

  .project-card:hover {
    border-color: var(--white);
    background: rgba(var(--primary), 0.02);
    transform: translateY(-2px);
    box-shadow: var(--glow);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    font-size: 0.7rem;
    color: var(--secondary);
    margin-bottom: 0.4rem;
  }

  .project-title {
    font-size: 1.3rem;
    margin: 0 0 0.4rem 0;
    color: var(--white);
    text-shadow: var(--glow);
  }

  .project-desc {
    font-size: 0.85rem;
    line-height: 1.4;
    color: var(--primary);
    margin: 0 0 0.8rem 0;
    flex: 1;
  }

  .project-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-bottom: 0.5rem;
  }

  .tech-tag {
    font-size: 0.7rem;
    border: 1px solid rgba(var(--primary), 0.3);
    padding: 0.05rem 0.3rem;
    border-radius: 1px;
    background: rgba(0, 0, 0, 0.2);
  }

  .card-console {
    height: 0;
    opacity: 0;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    background: #000;
    border-top: 1px solid transparent;
    margin-top: 0;
  }

  .card-console.active {
    height: 90px;
    opacity: 1;
    border-top: 1px solid rgba(var(--primary), 0.25);
    margin-top: 0.8rem;
    padding-top: 0.5rem;
  }

  .console-title {
    font-size: 0.65rem;
    color: var(--secondary);
    margin-bottom: 0.3rem;
  }

  .console-logs {
    font-size: 0.75rem;
    color: var(--primary);
    line-height: 1.3;
    font-family: var(--font-mono), monospace;
  }

  .console-line {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .github-footer {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-size: 0.9rem;
    border-top: 1px solid rgba(var(--primary), 0.15);
    padding-top: 1rem;
    margin-top: 1rem;
  }

  @media (max-width: 768px) {
    .projects-grid {
      grid-template-columns: 1fr;
    }
  }
</style>