<script lang="ts">
  import { onMount } from 'svelte';
  import { appState, type Theme } from '../state.svelte';
  import { playClick, playError, playSuccess } from '../audio';

  type CommandHistory = {
    input: string;
    output: string;
    isError?: boolean;
    isSystem?: boolean;
  };

  let history = $state<CommandHistory[]>([
    {
      input: '',
      output: 'FrogOS Terminal v1.4.0\nType "help" to see available commands.',
      isSystem: true
    }
  ]);
  let currentInput = $state('');
  let historyIndex = $state(-1);
  let commandInputRef = $state<HTMLInputElement | null>(null);
  let terminalEndRef = $state<HTMLDivElement | null>(null);
  let commandHistory = $state<string[]>([]);

  function handleKeyDown(e: KeyboardEvent) {
    // Play keyboard click sound
    playClick();

    if (e.key === 'Enter') {
      const command = currentInput.trim();
      if (command) {
        commandHistory = [...commandHistory, command];
        executeCommand(command);
      }
      currentInput = '';
      historyIndex = -1;
      scrollToBottom();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        if (historyIndex === -1) {
          historyIndex = commandHistory.length - 1;
        } else if (historyIndex > 0) {
          historyIndex--;
        }
        currentInput = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        if (historyIndex < commandHistory.length - 1) {
          historyIndex++;
          currentInput = commandHistory[historyIndex];
        } else {
          historyIndex = -1;
          currentInput = '';
        }
      }
    }
  }

  function executeCommand(input: string) {
    const parts = input.toLowerCase().split(' ');
    const cmd = parts[0];
    const arg = parts[1];

    let output = '';
    let isError = false;

    switch (cmd) {
      case 'help':
        output = `Available commands:
  about           - View the about dossier
  projects        - View the portfolio projects
  socials         - View the secure links
  color <theme>   - Switch theme (green, amber, pink, silver)
  beep            - Play a 8-bit synthetic beep
  matrix          - Toggle matrix code waterfall overlay
  cat frog        - Read system mascot profile (ASCII)
  clear           - Clear terminal logs`;
        playSuccess();
        break;

      case 'about':
      case 'projects':
      case 'socials':
        appState.setView(cmd);
        output = `Navigating to ${cmd.toUpperCase()} panel... SUCCESS`;
        playSuccess();
        break;

      case 'color':
        const themes: Theme[] = ['green', 'amber', 'pink', 'silver'];
        if (arg && themes.includes(arg as Theme)) {
          appState.setTheme(arg as Theme);
          output = `System color theme changed to [${arg.toUpperCase()}].`;
          playSuccess();
        } else {
          output = `Error: Invalid theme. Choose from: green, amber, pink, silver.`;
          isError = true;
          playError();
        }
        break;

      case 'beep':
        playSuccess();
        output = 'Beep command executed.';
        break;

      case 'matrix':
        appState.toggleMatrix();
        output = `Matrix override set to: ${appState.matrixActive ? 'ACTIVE' : 'INACTIVE'}`;
        playSuccess();
        break;

      case 'cat':
        if (arg === 'frog') {
          output = `
     _  _  
    (o)(o) 
   /      \\
  /  ____  \\ 
 |  /    \\  |
  \\ \\____/ / 
   \\______/  
  [Mascot: Froglodyte System Core (V.1)]
  Status: Sleeping on lilypad.
`;
          playSuccess();
        } else {
          output = `Usage: cat <file> (e.g. 'cat frog')`;
          isError = true;
          playError();
        }
        break;

      case 'clear':
        history = [];
        return;

      default:
        output = `Command not found: "${cmd}". Type "help" for a list of commands.`;
        isError = true;
        playError();
    }

    history = [...history, { input, output, isError }];
  }

  function scrollToBottom() {
    setTimeout(() => {
      terminalEndRef?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }

  function focusInput() {
    commandInputRef?.focus();
  }

  onMount(() => {
    focusInput();
  });
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="terminal" onclick={focusInput}>
  <div class="terminal-logs">
    {#each history as line}
      {#if line.input}
        <div class="log-input">
          <span class="prompt">guest@froglosite:~ $</span>
          <span class="cmd-text">{line.input}</span>
        </div>
      {/if}
      <div class="log-output" class:error={line.isError} class:system={line.isSystem}>
        {line.output}
      </div>
    {/each}
    <div bind:this={terminalEndRef}></div>
  </div>
  <div class="input-line">
    <span class="prompt">guest@froglosite:~ $</span>
    <input
      type="text"
      bind:value={currentInput}
      bind:this={commandInputRef}
      onkeydown={handleKeyDown}
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
      placeholder="Type a command..."
    />
  </div>
</div>

<style>
  .terminal {
    display: flex;
    flex-direction: column;
    height: 100%;
    font-family: var(--font-mono), monospace;
    font-size: 0.85rem;
    color: var(--primary);
    overflow: hidden;
  }

  .terminal-logs {
    flex: 1;
    overflow-y: auto;
    margin-bottom: 0.5rem;
    padding-right: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    min-height: 50px;
    max-height: 110px;
  }

  /* Custom Scrollbar for logs */
  .terminal-logs::-webkit-scrollbar {
    width: 4px;
  }
  .terminal-logs::-webkit-scrollbar-track {
    background: transparent;
  }
  .terminal-logs::-webkit-scrollbar-thumb {
    background: rgba(var(--primary), 0.2);
    border-radius: 2px;
  }

  .log-input {
    display: flex;
    gap: 0.5rem;
  }

  .prompt {
    color: var(--secondary);
    font-weight: bold;
    user-select: none;
  }

  .cmd-text {
    color: var(--white);
    text-shadow: var(--glow);
  }

  .log-output {
    white-space: pre-wrap;
    line-height: 1.3;
    padding-left: 0.5rem;
  }

  .log-output.error {
    color: #ff3333;
    text-shadow: 0 0 5px rgba(255, 51, 51, 0.4);
  }

  .log-output.system {
    color: var(--primary);
    opacity: 0.85;
  }

  .input-line {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-top: 1px solid rgba(var(--primary), 0.15);
    padding-top: 0.4rem;
  }

  input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: var(--white);
    font-family: inherit;
    font-size: inherit;
    caret-color: var(--primary);
    text-shadow: var(--glow);
    padding: 0;
    margin: 0;
  }

  input::placeholder {
    color: var(--secondary);
    opacity: 0.5;
  }
</style>
