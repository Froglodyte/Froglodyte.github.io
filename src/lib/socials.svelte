<script lang="ts">
  import { playHover, playSuccess, playClick } from './audio';

  const socialLinks = [
    {
      name: 'GitHub',
      label: 'SOURCE_CODE_REPOSITORY',
      url: 'https://github.com/Froglodyte',
      details: 'SSH node: github.com/Froglodyte | Port: 22 | RSA Key'
    },
    {
      name: 'LinkedIn',
      label: 'PROFESSIONAL_NETWORK',
      url: 'https://www.linkedin.com/in/mudit-bengani-0b0610322/',
      details: 'Host node: linkedin.com | Protocol: HTTPS | SSL Cert'
    },
    {
      name: 'Discord',
      label: 'DIRECT_COMMUNICATIONS',
      url: 'https://discordapp.com/users/805430566493093910',
      details: 'Gate node: discord.gg | Tunnel: WebSockets | AES-256'
    }
  ];

  let hoveredIndex = $state<number | null>(null);
  let activeConnectionIndex = $state<number | null>(null);
  let connLogs = $state<string[]>([]);

  function handleHover(index: number | null) {
    hoveredIndex = index;
    if (index !== null) {
      playHover();
    }
  }

  function handleConnect(index: number, url: string, e: MouseEvent) {
    e.preventDefault();
    if (activeConnectionIndex !== null) return; // Prevent double clicks
    
    activeConnectionIndex = index;
    playSuccess();
    
    connLogs = [
      `Establishing secure tunnel to ${socialLinks[index].name}...`,
      `Protocol: TLSv1.3 | Cipher: TLS_AES_256_GCM_SHA384`,
      `Key Exchange: ECDHE-RSA-2048 | Signature: Verified`,
      `Uplink established. Redirecting to external browser...`
    ];

    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
      activeConnectionIndex = null;
      connLogs = [];
    }, 1300);
  }
</script>

<div class="content">
  <h1><b>Soc</b>ial<b>s</b></h1>
  
  <div class="socials-container">
    <div class="uplinks-panel">
      {#each socialLinks as link, index}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div 
          class="uplink-row" 
          class:hovered={hoveredIndex === index}
          class:connecting={activeConnectionIndex === index}
          onmouseenter={() => handleHover(index)}
          onmouseleave={() => handleHover(null)}
          onclick={(e) => handleConnect(index, link.url, e)}
        >
          <div class="row-header">
            <div class="name-with-icon">
              {#if link.name === 'GitHub'}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="social-icon"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
              {:else if link.name === 'LinkedIn'}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="social-icon"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              {:else if link.name === 'Discord'}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="social-icon"><path d="M18.6 6A10.5 10.5 0 0 0 12 4a10.5 10.5 0 0 0-6.6 2C4.3 7.6 3 10.5 3 13.5A10.4 10.4 0 0 0 8.5 20c.4-.6.8-1.2 1-1.9a7.3 7.3 0 0 1-2.2-1.1c.2-.2.4-.3.6-.5A6.9 6.9 0 0 0 12 17a6.9 6.9 0 0 0 4.1-.5c.2.2.4.3.6.5a7.3 7.3 0 0 1-2.2 1.1c.2.7.6 1.3 1 1.9a10.4 10.4 0 0 0 5.5-6.5C21 10.5 19.7 7.6 18.6 6z"></path><circle cx="9" cy="12" r="1"></circle><circle cx="15" cy="12" r="1"></circle></svg>
              {/if}
              <span class="uplink-name">{link.name}</span>
            </div>
            <span class="uplink-label">{link.label}</span>
          </div>
          <div class="row-footer">
            <span class="uplink-status">
              {activeConnectionIndex === index ? '[UPLINKING...]' : '[READY FOR HANDSHAKE]'}
            </span>
            <span class="uplink-action">CONNECT ></span>
          </div>
        </div>
      {/each}
    </div>

    <div class="connection-status-panel">
      <div class="status-header">COMMUNICATION CONTROLLER STATUS</div>
      {#if activeConnectionIndex !== null}
        <div class="live-logs">
          {#each connLogs as log}
            <div class="log-line">> {log}</div>
          {/each}
          <div class="loader-bar">
            <div class="loader-progress"></div>
          </div>
        </div>
      {:else if hoveredIndex !== null}
        <div class="node-details">
          <div class="detail-title">TARGET NODE: {socialLinks[hoveredIndex].name.toUpperCase()}</div>
          <div class="detail-body">{socialLinks[hoveredIndex].details}</div>
          <div class="encryption-badge">SECURE HANDSHAKE ENABLED</div>
        </div>
      {:else}
        <div class="idle-state">
          <p>SELECT A NODE ABOVE TO INITIALIZE SECURE OUTBOUND UPLINK.</p>
          <div class="signal-radar">
            <div class="radar-ping"></div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .socials-container {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 1.5rem;
    margin-top: 1rem;
    height: calc(100% - 3.5rem);
    min-height: 250px;
  }

  .uplinks-panel {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .uplink-row {
    background: rgba(0, 0, 0, 0.4);
    border: var(--border);
    padding: 0.8rem 1rem;
    cursor: pointer;
    transition: all var(--transition);
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .uplink-row:hover {
    border-color: var(--white);
    background: rgba(var(--primary), 0.03);
    box-shadow: var(--glow);
    transform: translateX(3px);
  }

  .uplink-row.connecting {
    border-color: var(--white);
    background: var(--primary);
    color: var(--black);
    box-shadow: var(--glow-strong);
  }

  .uplink-row.connecting .uplink-name,
  .uplink-row.connecting .uplink-status,
  .uplink-row.connecting .uplink-action {
    color: var(--black) !important;
    text-shadow: none !important;
  }

  .row-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .uplink-name {
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--white);
    text-shadow: var(--glow);
  }

  .uplink-label {
    font-size: 0.65rem;
    color: var(--secondary);
    letter-spacing: 0.5px;
  }

  .uplink-row.connecting .uplink-label {
    color: rgba(0, 0, 0, 0.6);
  }

  .row-footer {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
  }

  .uplink-status {
    color: var(--primary);
  }

  .uplink-action {
    color: var(--secondary);
    font-weight: 600;
  }

  .uplink-row:hover .uplink-action {
    color: var(--white);
  }

  .name-with-icon {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .social-icon {
    color: var(--white);
    stroke-width: 2.2px;
    filter: drop-shadow(var(--glow));
    transition: var(--transition);
  }

  .uplink-row.connecting .social-icon {
    color: var(--black);
    filter: none;
  }

  .connection-status-panel {
    background: #000;
    border: var(--border);
    padding: 1rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    min-height: 180px;
    height: 100%;
  }

  .status-header {
    font-size: 0.7rem;
    color: var(--secondary);
    border-bottom: 1px solid rgba(var(--primary), 0.2);
    padding-bottom: 0.4rem;
    margin-bottom: 0.8rem;
    text-transform: uppercase;
  }

  .node-details {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.85rem;
    height: 100%;
  }

  .detail-title {
    color: var(--white);
    font-weight: bold;
    text-shadow: var(--glow);
  }

  .detail-body {
    color: var(--primary);
    line-height: 1.4;
    word-break: break-all;
  }

  .encryption-badge {
    margin-top: auto;
    font-size: 0.7rem;
    border: 1px solid var(--border-color);
    padding: 0.2rem;
    text-align: center;
    background: rgba(var(--primary), 0.05);
  }

  .live-logs {
    font-size: 0.8rem;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    color: var(--primary);
  }

  .log-line {
    word-break: break-all;
  }

  .loader-bar {
    margin-top: 1rem;
    height: 4px;
    background: rgba(var(--primary), 0.2);
    position: relative;
    overflow: hidden;
  }

  .loader-progress {
    height: 100%;
    background: var(--primary);
    box-shadow: var(--glow);
    width: 0%;
    animation: load 1.2s linear forwards;
  }

  @keyframes load {
    to { width: 100%; }
  }

  .idle-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex: 1;
    color: var(--secondary);
    font-size: 0.8rem;
  }

  .signal-radar {
    margin-top: 1.5rem;
    width: 40px;
    height: 40px;
    border: 1px solid var(--secondary);
    border-radius: 50%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .radar-ping {
    width: 8px;
    height: 8px;
    background: var(--secondary);
    border-radius: 50%;
    animation: ping 1.5s ease-out infinite;
  }

  @keyframes ping {
    0% { transform: scale(1); opacity: 1; }
    100% { transform: scale(4); opacity: 0; }
  }

  @media (max-width: 768px) {
    .socials-container {
      grid-template-columns: 1fr;
      height: auto;
    }
  }
</style>