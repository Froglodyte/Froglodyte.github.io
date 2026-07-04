<script lang="ts">
  import { onMount } from 'svelte';
  import { appState, type Theme } from '../state.svelte';
  import { playChime, playHover } from '../audio';

  let uptime = $state(0.0);
  let cpuCanvasRef = $state<HTMLCanvasElement | null>(null);

  const skills = [
    { name: 'Rust', val: 85 },
    { name: 'Go', val: 80 },
    { name: 'TypeScript', val: 88 },
    { name: 'C/C++', val: 71 }
  ];

  function getBar(value: number) {
    const totalBlocks = 10;
    const filledBlocks = Math.round((value / 100) * totalBlocks);
    return '█'.repeat(filledBlocks) + '░'.repeat(totalBlocks - filledBlocks);
  }

  function toggleAudio() {
    playChime();
    appState.toggleAudio();
  }

  function changeTheme(theme: Theme) {
    appState.setTheme(theme);
    playChime();
  }

  onMount(() => {
    // 1. Uptime clock
    const start = Date.now();
    const uptimeInterval = setInterval(() => {
      uptime = (Date.now() - start) / 1000;
    }, 100);

    // 2. CPU Graph simulation
    let animationFrameId: number;
    const canvas = cpuCanvasRef;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        let dataPoints: number[] = Array(30).fill(20);
        
        const drawGraph = () => {
          let color = '#4AF626';
          if (appState.theme === 'amber') color = '#FFB000';
          else if (appState.theme === 'pink') color = '#FF33CC';
          else if (appState.theme === 'silver') color = '#D1D1E0';

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          // Shift and add new point
          dataPoints.shift();
          const lastPoint = dataPoints[dataPoints.length - 1];
          const deviation = (Math.random() - 0.5) * 10;
          const nextPoint = Math.max(5, Math.min(canvas.height - 5, lastPoint + deviation));
          dataPoints.push(nextPoint);

          // Draw grid
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
          ctx.lineWidth = 1;
          for (let i = 0; i < canvas.width; i += 10) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.height);
            ctx.stroke();
          }
          for (let j = 0; j < canvas.height; j += 10) {
            ctx.beginPath();
            ctx.moveTo(0, j);
            ctx.lineTo(canvas.width, j);
            ctx.stroke();
          }

          // Draw line
          ctx.strokeStyle = color;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(0, dataPoints[0]);
          for (let i = 1; i < dataPoints.length; i++) {
            const x = (i / (dataPoints.length - 1)) * canvas.width;
            ctx.lineTo(x, dataPoints[i]);
          }
          ctx.stroke();

          // Draw area
          ctx.fillStyle = color.replace(')', ', 0.08)').replace('#', 'rgba('); // simple approximation
          // Use proper rgba values depending on theme
          let fillGradient = 'rgba(74, 246, 38, 0.08)';
          if (appState.theme === 'amber') fillGradient = 'rgba(255, 176, 0, 0.08)';
          else if (appState.theme === 'pink') fillGradient = 'rgba(255, 51, 204, 0.08)';
          else if (appState.theme === 'silver') fillGradient = 'rgba(209, 209, 224, 0.08)';
          
          ctx.fillStyle = fillGradient;
          ctx.lineTo(canvas.width, canvas.height);
          ctx.lineTo(0, canvas.height);
          ctx.closePath();
          ctx.fill();

          animationFrameId = requestAnimationFrame(drawGraph);
        };
        drawGraph();
      }
    }

    return () => {
      clearInterval(uptimeInterval);
      cancelAnimationFrame(animationFrameId);
    };
  });
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="sidebar-widget">
  <div class="widget-title">
    <span>SYSTEM DOSSIER</span>
    <span class="status-dot"></span>
  </div>
  <div class="widget-content system-info">
    <div>SYS: <span class="white-text">FROG_OS V1.4</span></div>
    <div>UPTIME: <span class="white-text">{uptime.toFixed(1)}s</span></div>
    <div>VIEW: <span class="white-text" style="text-transform: uppercase;">{appState.currentView}</span></div>
    <div class="audio-row">
      <span>AUDIO:</span>
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <span class="audio-val cursor-pointer" onclick={toggleAudio} onmouseenter={playHover}>
        [{appState.audioEnabled ? 'UNMUTED' : 'MUTED'}]
      </span>
    </div>
  </div>
</div>

<div class="sidebar-widget">
  <div class="widget-title">
    <span>CPU TELEMETRY</span>
    <span class="white-text">CORE_0</span>
  </div>
  <div class="widget-content">
    <canvas bind:this={cpuCanvasRef} width="240" height="40"></canvas>
  </div>
</div>

<div class="sidebar-widget">
  <div class="widget-title">
    <span>CORE SKILLS</span>
    <span class="white-text">ROM</span>
  </div>
  <div class="widget-content skills-list">
    {#each skills as skill}
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div class="skill-item" onmouseenter={playHover}>
        <div class="skill-label">
          <span>{skill.name}</span>
          <span class="white-text">{skill.val}%</span>
        </div>
        <div class="skill-bar">{getBar(skill.val)}</div>
      </div>
    {/each}
  </div>
</div>

<div class="sidebar-widget">
  <div class="widget-title">
    <span>CRT COLOR THEME</span>
  </div>
  <div class="widget-content theme-row">
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="theme-option" class:active={appState.theme === 'green'} onclick={() => changeTheme('green')} onmouseenter={playHover}>
      <span class="theme-dot green"></span> GREEN
    </div>
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="theme-option" class:active={appState.theme === 'amber'} onclick={() => changeTheme('amber')} onmouseenter={playHover}>
      <span class="theme-dot amber"></span> AMBER
    </div>
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="theme-option" class:active={appState.theme === 'pink'} onclick={() => changeTheme('pink')} onmouseenter={playHover}>
      <span class="theme-dot pink"></span> PINK
    </div>
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="theme-option" class:active={appState.theme === 'silver'} onclick={() => changeTheme('silver')} onmouseenter={playHover}>
      <span class="theme-dot silver"></span> SILVER
    </div>
  </div>
</div>

<style>
  .system-info {
    font-size: 0.8rem;
    line-height: 1.4;
  }

  .white-text {
    color: var(--white);
    text-shadow: var(--glow);
  }

  .audio-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.2rem;
  }

  .audio-val {
    color: var(--primary);
    font-weight: bold;
    border: 1px solid var(--primary);
    padding-inline: 0.3rem;
    border-radius: 2px;
    font-size: 0.75rem;
    background: rgba(var(--primary), 0.05);
  }

  .audio-val:hover {
    background: var(--primary);
    color: var(--black);
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .skills-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .skill-item {
    font-size: 0.75rem;
  }

  .skill-label {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.1rem;
  }

  .skill-bar {
    letter-spacing: -0.5px;
    color: var(--primary);
    font-family: monospace;
  }

  .theme-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.4rem;
    font-size: 0.75rem;
  }

  .theme-option {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    cursor: pointer;
    border: 1px solid rgba(var(--primary), 0.15);
    padding: 0.2rem;
    border-radius: 2px;
    transition: all var(--transition);
  }

  .theme-option:hover, .theme-option.active {
    border-color: var(--primary);
    background: rgba(var(--primary), 0.05);
    color: var(--white);
  }

  .theme-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    display: inline-block;
  }

  .theme-dot.green { background: #33ff33; }
  .theme-dot.amber { background: #ffb333; }
  .theme-dot.pink { background: #ff33cc; }
  .theme-dot.silver { background: #d1d1e0; }

  canvas {
    display: block;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(var(--primary), 0.15);
  }
</style>
