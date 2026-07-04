export type Theme = 'green' | 'amber' | 'pink' | 'silver';

class GlobalState {
  currentView = $state<string>('about');
  theme = $state<Theme>('green');
  audioEnabled = $state<boolean>(true);
  matrixActive = $state<boolean>(false);

  constructor() {
    const themes: Theme[] = ['green', 'amber', 'pink', 'silver'];
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    this.theme = randomTheme;
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', randomTheme);
    }
  }

  get waveColor(): [number, number, number] {
    switch (this.theme) {
      case 'amber':
        return [0.22, 0.12, 0.01]; // Dark amber
      case 'pink':
        return [0.15, 0.03, 0.09]; // Dark synthwave coral/pink
      case 'silver':
        return [0.12, 0.12, 0.14]; // Dark slate/grey
      case 'green':
      default:
        return [0.01, 0.15, 0.09]; // Dark mint/emerald green
    }
  }

  setTheme(newTheme: Theme) {
    this.theme = newTheme;
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', newTheme);
    }
  }

  setView(newView: string) {
    this.currentView = newView;
  }

  toggleAudio() {
    this.audioEnabled = !this.audioEnabled;
  }

  toggleMatrix() {
    this.matrixActive = !this.matrixActive;
  }
}

export const appState = new GlobalState();
