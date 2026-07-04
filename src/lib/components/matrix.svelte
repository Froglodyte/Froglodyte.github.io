<script lang="ts">
  import { onMount } from 'svelte';
  import { appState } from '../state.svelte';

  let canvasRef = $state<HTMLCanvasElement | null>(null);

  onMount(() => {
    if (!canvasRef) return;
    const canvas = canvasRef;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    
    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      initRain();
    };
    
    window.addEventListener('resize', resize);

    const katakana = 'ｱｧｶｻﾀﾅﾊﾏﾔｬﾗﾜｶﾞｻﾞﾀﾞﾊﾞﾊﾟｲｨｷｼﾁﾆﾋﾐﾘヰｷﾞｼﾞﾁﾞﾋﾞﾋﾟｳｩｸｽﾂﾇﾌﾑﾕｭﾙｸﾞｽﾞﾂﾞﾌﾞﾌﾟｴｪｹｾﾃﾈﾍﾒﾚヱｹﾞｾﾞﾃﾞﾍﾞﾍﾟｵｫｺｿﾄﾉﾎﾓﾖｮﾛｦｺﾞｿﾞﾄﾞﾎﾞﾎﾟｳﾞｯﾝ0123456789';
    const alphabet = katakana.split('');

    const fontSize = 12;
    let columns = Math.floor(canvas.width / fontSize) || 1;
    let rainDrops: number[] = [];
    
    const initRain = () => {
      columns = Math.floor(canvas.width / fontSize) || 1;
      rainDrops = [];
      for (let x = 0; x < columns; x++) {
        rainDrops[x] = Math.floor(Math.random() * -80);
      }
    };
    
    resize();

    const draw = () => {
      // Get primary color hex or default
      let color = '#00FF9D';
      let bgStyle = 'rgba(0, 0, 0, 0.09)';

      if (appState.theme === 'amber') color = '#FFB000';
      else if (appState.theme === 'pink') color = '#FF5E97';
      else if (appState.theme === 'silver') color = '#D1D1E0';
      else if (appState.theme === 'cyber-light') {
        color = '#0070F3';
        bgStyle = 'rgba(244, 246, 249, 0.09)';
      } else if (appState.theme === 'solar-light') {
        color = '#2AA198';
        bgStyle = 'rgba(253, 246, 227, 0.09)';
      }

      ctx.fillStyle = bgStyle;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = color;
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  });
</script>

<canvas bind:this={canvasRef}></canvas>

<style>
  canvas {
    display: block;
    width: 100%;
    height: 100%;
    background: transparent;
  }
</style>
